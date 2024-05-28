import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputLabel2 from '@/Components/InputLabel2';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
//import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
//import CustomDropdown from '@/Components/CustomDropdown';

import JournalCard from '@/Components/JournalCard';
import PlusButton from '@/Components/PlusButton';
import Modal from '@/Components/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTachometerAlt, faCog, faEnvelope, faTimes, faFileImport, faPenNib, faFilePen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/SecondaryButton';

export default function InReview({ message, auth }) {
    const { users, papers, paperStatus, reviewerAcceptDecline, paperReviewers, externalReviewers } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showStateChangeModal, setShowStateChangeModal] = useState(false);

    const [notification, setNotification] = useState(null);

    const [feedbackModal, setFeedbackModal] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        paperID: '',
        overallRecommendation: '',
        generalComments: '',
        detailedFeedback: '',
        criticalAssessment: '',
        suggestionsForImprovement: '',
        summaryOfFindings: '',
        assessmentOfOriginality: '',
        assessmentOfClarity: '',
        assessmentOfMethodology: '',
        assessmentOfResults: '',
        assessmentOfReferences: '',
        confidentialCommentsToTheEditor: '',
        additionalReferencesOrResources: '',
        completionTimeframe: '',
    });

    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, reset: reset2 } = useForm({
        paperID: '',
        state: '',
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            paperID: selectedPaper.paperID,
            overallRecommendation: data.overallRecommendation,
            generalComments: data.generalComments,
            detailedFeedback: data.detailedFeedback,
            criticalAssessment: data.criticalAssessment,
            suggestionsForImprovement: data.suggestionsForImprovement,
            summaryOfFindings: data.summaryOfFindings,
            assessmentOfOriginality: data.assessmentOfOriginality,
            assessmentOfClarity: data.assessmentOfClarity,
            assessmentOfMethodology: data.assessmentOfMethodology,
            assessmentOfResults: data.assessmentOfResults,
            assessmentOfReferences: data.assessmentOfReferences,
            confidentialCommentsToTheEditor: data.confidentialCommentsToTheEditor,
            additionalReferencesOrResources: data.additionalReferencesOrResources,
            completionTimeframe: data.completionTimeframe,
        };
        router.post(route('storeFeedback'), formData, {
            onSuccess: () => {
                //setNotification('Paper uploaded');
                setShowModal(true);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleFormSubmit2 = (e) => {
        e.preventDefault();
        const formData2 = {
            paperID: selectedPaper.paperID,
            state: data2.state,
        };
        router.post(route('storeReviewerAcceptDecline'), formData2, {
            onSuccess: () => {
                //setNotification('Paper uploaded');
                setShowStateChangeModal(true);
            },
            onError: (errors2) => {
                console.log(errors2);
            }
        });
    };

    const openModalWithPaper = (paper) => {
        setSelectedPaper(paper);
        setShowModal2(true);
    };

    const handleFeedbackModal = () => {
        //id.preventDefault();
        setFeedbackModal(true);
    };

    const getReviewerState = (paperID, reviewerEmail) => {
        if (!reviewerAcceptDecline || reviewerAcceptDecline.length === 0) return null;
        const review = reviewerAcceptDecline.find(
            (item) => item.paperID === paperID && item.reviewer === reviewerEmail
        );
        return review ? review.state : null;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Journal</h2>}
        >
            <Head title="Journals ;)" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Submissions to review</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    The following Submissions are to be reviewed:
                                </p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                const reviewer = paperReviewers.some(reviewer => reviewer.paperID === paper.paperID && reviewer.reviewer === auth.user.email );
                                                console.log(auth.user.email);
                                                return status === 'Approved' && reviewer;
                                            })
                                            .map((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return (
                                                    <JournalCard
                                                        key={paper.id}
                                                        user={auth.user}
                                                        badgeContent={status}
                                                        title={paper.title}
                                                        abstract={paper.abstract}
                                                        paper={paper}
                                                        onRedirectClick={() => openModalWithPaper(paper)}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
            {selectedPaper && (
                <Modal show={showModal2} onClose={() => setShowModal2(false)}>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="mb-4 flex justify-between items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                                {paperStatus.find(status => status.paperID === selectedPaper.paperID)?.status || 'No Status'}
                            </span>

                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{selectedPaper.title}</h2>

                        <div className="max-h-80 overflow-y-auto space-y-4"> {/* Set max-height for the container */}
                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Abstract</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.abstract}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Type & Classification</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Type: {selectedPaper.type}</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Classification: {selectedPaper.classification}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Authors</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Primary Author: {selectedPaper.author}</p>
                                {selectedPaper.co_author1 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Co-author 1: {selectedPaper.co_author1}</p>}
                                {selectedPaper.co_author2 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Co-author 2: {selectedPaper.co_author2}</p>}
                                {selectedPaper.co_author3 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Co-author 3: {selectedPaper.co_author3}</p>}
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Corresponding Authors</h3>
                                {selectedPaper.correspondingAuthor1 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Corresponding Author 1: {selectedPaper.correspondingAuthor1}</p>}
                                {selectedPaper.correspondingAuthor2 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Corresponding Author 2: {selectedPaper.correspondingAuthor2}</p>}
                                {selectedPaper.correspondingAuthor3 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Corresponding Author 3: {selectedPaper.correspondingAuthor3}</p>}
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Keywords</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.keywords}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Comments</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.comments}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Reviewers</h3>
                                {selectedPaper.reviewer1 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Reviewer 1: {selectedPaper.reviewer1}</p>}
                                {selectedPaper.reviewer2 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Reviewer 2: {selectedPaper.reviewer2}</p>}
                                {selectedPaper.reviewer3 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Reviewer 3: {selectedPaper.reviewer3}</p>}
                                {selectedPaper.reviewer4 && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Reviewer 4: {selectedPaper.reviewer4}</p>}
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Language Option</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.language_option}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Funding</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.funding}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Conflicts of Interest</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.conflictsOfInterest}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Ethical Statement</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.ethicalStatement}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Consent to Policies</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.consentToPolicies}</p>
                            </section>

                            <div className="mt-4 flex flex-col space-y-2">
                                <a href={route('editableFile.download', { id: selectedPaper.paperID })} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-700">
                                    Download Editable File
                                </a>
                                <a href={route('pdfFile.download', { id: selectedPaper.paperID })} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-700">
                                    Download PDF File
                                </a>
                            </div>

                            
                            
                        </div>

                        <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />

                        {(() => {
                                const reviewerState = getReviewerState(selectedPaper.paperID, auth.user.email);
                                if (reviewerState === null) {
                                    return (
                                        <div>
                                            <form onSubmit={handleFormSubmit2}>
                                                <div className="mt-4 mb-2">
                                                    <InputLabel htmlFor="state" value="What do you want t do with this submission?" />
                                                    <select
                                                        id="state"
                                                        name="state"
                                                        value={data2.state}
                                                        className='mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData2('state', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select state</option>
                                                        <option value="accept">Accept</option>
                                                        <option value="decline">Decline</option>
                                                    </select>
                                                    <InputError message={errors2.state} className="mt-2" />
                                                </div>
                                                <PrimaryButton type="submit">Submit</PrimaryButton>
                                            </form>
                                        </div>
                                    );
                                } else if (reviewerState === 'accept') {
                                    return <SecondaryButton onClick={handleFeedbackModal}>Feedback</SecondaryButton>;
                                } else if (reviewerState === 'decline') {
                                    return <p className="text-red-500">You have declined this paper</p>;
                                }
                            })()}

                    </div>

                </Modal>
            )}
            {selectedPaper && (
                <Modal show={showStateChangeModal} onClose={() => setShowStateChangeModal(false)} maxWidth="md">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">State Changed</h2>
                        <p className="text-md text-gray-900 dark:text-gray-100">Paper Selected to Review</p>
                    </div>
                </Modal>
            )}
            {selectedPaper && (
                <Modal show={feedbackModal} onClose={() => setFeedbackModal(false)} >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Review the submission and submit your feedback</h2>
                        <p className="text-md text-gray-900 dark:text-gray-100">&nbsp;</p>
                        <div className="max-h-96 overflow-y-auto"> {/* Set max-height for the table container */}
                            <form onSubmit={handleFormSubmit} className='mr-2'>
                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="overallRecommendation" value="Overall Recommendation" />

                                    <TextArea
                                        id="overallRecommendation"
                                        name="overallRecommendation"
                                        value={data.overallRecommendation}
                                        className="mt-1 block w-full"
                                        autoComplete="overallRecommendation"
                                        isFocused={true}
                                        onChange={(e) => setData('overallRecommendation', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.overallRecommendation} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="generalComments" value="General Comments" />

                                    <TextArea
                                        id="generalComments"
                                        name="generalComments"
                                        value={data.generalComments}
                                        className="mt-1 block w-full"
                                        autoComplete="generalComments"
                                        onChange={(e) => setData('generalComments', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.generalComments} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="detailedFeedback" value="Detailed Feedback" />

                                    <TextArea
                                        id="detailedFeedback"
                                        name="detailedFeedback"
                                        value={data.detailedFeedback}
                                        className="mt-1 block w-full"
                                        autoComplete="detailedFeedback"
                                        onChange={(e) => setData('detailedFeedback', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.overallRecommendation} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="criticalAssessment" value="Critical Assessment" />

                                    <TextArea
                                        id="criticalAssessment"
                                        name="criticalAssessment"
                                        value={data.criticalAssessment}
                                        className="mt-1 block w-full"
                                        autoComplete="criticalAssessment"
                                        onChange={(e) => setData('criticalAssessment', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.criticalAssessment} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="suggestionsForImprovement" value="Suggestions for Improvement" />

                                    <TextArea
                                        id="suggestionsForImprovement"
                                        name="suggestionsForImprovement"
                                        value={data.suggestionsForImprovement}
                                        className="mt-1 block w-full"
                                        autoComplete="suggestionsForImprovement"
                                        onChange={(e) => setData('suggestionsForImprovement', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.overallRecommendation} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="summaryOfFindings" value="Summary of Findings" />

                                    <TextArea
                                        id="summaryOfFindings"
                                        name="summaryOfFindings"
                                        value={data.summaryOfFindings}
                                        className="mt-1 block w-full"
                                        autoComplete="summaryOfFindings"
                                        onChange={(e) => setData('summaryOfFindings', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.summaryOfFindings} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="assessmentOfOriginality" value="Assessment of Originality" />

                                    <TextArea
                                        id="assessmentOfOriginality"
                                        name="assessmentOfOriginality"
                                        value={data.assessmentOfOriginality}
                                        className="mt-1 block w-full"
                                        autoComplete="assessmentOfOriginality"
                                        onChange={(e) => setData('assessmentOfOriginality', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assessmentOfOriginality} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="assessmentOfClarity" value="Assessment of Clarity" />

                                    <TextArea
                                        id="assessmentOfClarity"
                                        name="assessmentOfClarity"
                                        value={data.assessmentOfClarity}
                                        className="mt-1 block w-full"
                                        autoComplete="assessmentOfClarity"
                                        onChange={(e) => setData('assessmentOfClarity', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assessmentOfClarity} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="assessmentOfMethodology" value="Assessment of Methodology" />

                                    <TextArea
                                        id="assessmentOfMethodology"
                                        name="assessmentOfMethodology"
                                        value={data.assessmentOfMethodology}
                                        className="mt-1 block w-full"
                                        autoComplete="assessmentOfMethodology"
                                        onChange={(e) => setData('assessmentOfMethodology', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assessmentOfMethodology} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="assessmentOfResults" value="Assessment of Results" />

                                    <TextArea
                                        id="assessmentOfResults"
                                        name="assessmentOfResults"
                                        value={data.assessmentOfResults}
                                        className="mt-1 block w-full"
                                        autoComplete="assessmentOfResults"
                                        onChange={(e) => setData('assessmentOfResults', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assessmentOfResults} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="assessmentOfReferences" value="Assessment of References" />

                                    <TextArea
                                        id="assessmentOfReferences"
                                        name="assessmentOfReferences"
                                        value={data.assessmentOfReferences}
                                        className="mt-1 block w-full"
                                        autoComplete="assessmentOfReferences"
                                        onChange={(e) => setData('assessmentOfReferences', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assessmentOfReferences} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="confidentialCommentsToTheEditor" value="Confidential Comments to the Editor" />

                                    <TextArea
                                        id="confidentialCommentsToTheEditor"
                                        name="confidentialCommentsToTheEditor"
                                        value={data.confidentialCommentsToTheEditor}
                                        className="mt-1 block w-full"
                                        autoComplete="confidentialCommentsToTheEditor"
                                        onChange={(e) => setData('confidentialCommentsToTheEditor', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.confidentialCommentsToTheEditor} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="additionalReferencesOrResources" value="Additional References or Resources" />

                                    <TextArea
                                        id="additionalReferencesOrResources"
                                        name="additionalReferencesOrResources"
                                        value={data.additionalReferencesOrResources}
                                        className="mt-1 block w-full"
                                        autoComplete="additionalReferencesOrResources"
                                        onChange={(e) => setData('additionalReferencesOrResources', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.additionalReferencesOrResources} className="mt-2" />
                                </div>

                                <div className="mt-4 mb-5">
                                    <InputLabel htmlFor="completionTimeframe" value="Completion Timeframe" />

                                    <TextArea
                                        id="completionTimeframe"
                                        name="completionTimeframe"
                                        value={data.completionTimeframe}
                                        className="mt-1 block w-full"
                                        autoComplete="completionTimeframe"
                                        onChange={(e) => setData('completionTimeframe', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.completionTimeframe} className="mt-2" />
                                </div>

                                <PrimaryButton type="submit">Submit</PrimaryButton>

                            </form>

                        </div>
                    </div>
                </Modal>
            )}
            {selectedPaper && (
                <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Feedback Sent</h2>
                        <p className="text-md text-gray-900 dark:text-gray-100">Feedback sent to editor for further proceedings.</p>
                    </div>
                </Modal>
            )}


        </AuthenticatedLayout>
    );
}

