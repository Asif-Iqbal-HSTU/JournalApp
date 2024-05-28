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
import { faUser, faCheck, faTachometerAlt, faCog, faEnvelope, faTimes, faFileImport, faPenNib, faFilePen, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function AuthorBoard({ message, auth }) {
    const { faculties, departments, teacherCourses, teacherCoursesChairman, teachers, reviewerFeedbacks, users, papers, paperStatus, externalReviewers, reviewers } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [revisionModal, setRevisionModal] = useState(false);
    const [showAddedModal, setShowAddedModal] = useState(false);
    const [showExtSettingModal, setShowExtSettingModal] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [notification, setNotification] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard-content');
    const [activeStep, setActiveStep] = useState(0);
    const [classifications, setClassifications] = useState([]);


    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        classification: '',
        author: auth.user.email,
        co_author1: '',
        co_author2: '',
        co_author3: '',
        correspondingAuthor1: '',
        correspondingAuthor2: '',
        correspondingAuthor3: '',
        reviewer1: '',
        reviewer2: '',
        reviewer3: '',
        reviewer4: '',
        language_option: '',
        comments: '',
        title: '',
        abstract: '',
        keywords: '',
        editableFile: null,
        pdfFile: null,
        imageFile: null,
        funding: '',
        conflictsOfInterest: '',
        ethicalStatement: '',
        consentToPolicies: 'Yes',
    });

    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, reset: reset2 } = useForm({
        name: '',
        email: '',
        affiliation: '',
        academicTitle: '',
    });

    const { data: data3, setData: setData3, post: post3, processing: processing3, errors: errors3, reset: reset3 } = useForm({
        paperID: data.author + '_' + data.title + '_' + data.type,
        externalReviewer: '',
    });

    const types = ['Type 1', 'Type 2'];
    const language_options = ['Yes', 'No', 'Not Applicable'];

    const handleTabClick = (e, tabId) => {
        e.preventDefault();

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        // Show the selected tab content
        document.getElementById(tabId).classList.remove('hidden');

        // Remove active class from all tab links
        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked tab link
        e.target.classList.add('active');

        // Update activeTab state
        setActiveTab(tabId);
    };

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1);
    };

    const handlePrev = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            type: data.type,
            author: data.author,
            co_author1: data.co_author1,
            co_author2: data.co_author2,
            co_author3: data.co_author3,
            correspondingAuthor1: data.correspondingAuthor1,
            correspondingAuthor2: data.correspondingAuthor2,
            correspondingAuthor3: data.correspondingAuthor3,
            reviewer1: data.reviewer1,
            reviewer2: data.reviewer2,
            reviewer3: data.reviewer3,
            reviewer4: data.reviewer4,
            language_option: data.language_option,
            comments: data.comments,
            title: data.title,
            abstract: data.abstract,
            keywords: data.keywords,
            editableFile: data.editableFile,
            pdfFile: data.pdfFile,
            imageFile: data.imageFile,
            funding: data.funding,
            conflictsOfInterest: data.conflictsOfInterest,
            ethicalStatement: data.ethicalStatement,
            consentToPolicies: data.consentToPolicies,
            //CourseCode: courseCode,
            //content: content,
            classification: classifications.join(', '),
            //assessment_strategy: assessmentStrategies.join(', '),
            //mapping: mappings.join(', ')
        };
        router.post(route('storePaper'), formData, {
            onSuccess: () => {
                setNotification('Paper uploaded');
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
            name: data2.name,
            email: data2.email,
            affiliation: data2.affiliation,
            academicTitle: data2.academicTitle,
        };
        router.post(route('storeExternalReviewer'), formData2, {
            onSuccess: () => {
                setShowAddedModal(true);
            },
            onError: (errors2) => {
                console.log(errors2);
            }
        });
    };

    const handleFormSubmit3 = (e) => {
        e.preventDefault();
        const formData3 = {
            paperID: data3.paperID,
            externalReviewer: data3.externalReviewer,
        };
        router.post(route('setExternalReviewer'), formData3);
    };

    const openModalWithPaper = (paper) => {
        setSelectedPaper(paper);
        setShowModal2(true);
    };

    const extSettingModal = () => {
        setShowExtSettingModal(true);
    };

    const toggleExternalReviewerModal = () => {
        setShowModal3(true);
    };

    const revisionsModal = () => {
        setRevisionModal(true);
    }



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Journal</h2>}
        >
            <Head title="Journals ;)" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="mt-6">
                    <div className="md:flex">
                        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0" id="tab-container">
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'dashboard-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'dashboard-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faTachometerAlt} className="w-4 h-4 me-2" />
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'submit_new-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'submit_new-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faFileImport} className="w-4 h-4 me-2" />
                                    Submit New Menuscript
                                </a>
                            </li>
                            {/** 
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'incomplete-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'incomplete-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faCog} className="w-4 h-4 me-2" />
                                    Incomplete Submissions
                                </a>
                            </li>
                            */}
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'for_approval-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'for_approval-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faPenNib} className="w-4 h-4 me-2" />
                                    Submissions Waiting for Editor Approval
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'need_revision-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'need_revision-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faFilePen} className="w-4 h-4 me-2" />
                                    Submissions Need Revision
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'processed-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'processed-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 me-2" />
                                    Submissions Being Processed
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'accepted-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'accepted-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 me-2" />
                                    Accepted Submissions
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'declined-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'declined-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4 me-2" />
                                    Rejected Submissions
                                </a>
                            </li>
                        </ul>
                        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full" id="tab-content">
                            <div id="dashboard-content" className="tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard</h3>
                                <p className="mb-2">Welcome to your Dashboard! Here, you can view all your submissions and their current status at a glance.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">

                                        {papers.map((paper) => {
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
                            </div>
                            <div id="submit_new-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submit New Menuscript</h3>
                                <p className="mb-2">Ready to share your research? Submit a new manuscript here and start the journey towards publication.</p>



                                <ol class="flex flex-wrap items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base overflow-x-auto">
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <li key={index} className={`relative flex items-center ${activeStep >= index ? 'text-blue-600 dark:text-blue-500' : ''} mx-2 my-2 xl:mx-4`}>
                                            {index < 9 && (
                                                <span className="absolute top-1/2 left-full w-[calc(100%-1rem)] border-b border-gray-200 dark:border-gray-700 transform -translate-y-1/2"></span>
                                            )}
                                            <span class="flex items-center">
                                                <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= index ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'} rounded-full shrink-0 mr-2 ml-2`}>
                                                    {index + 1}
                                                </span>
                                                {/*<span class="text-xs">Step {index + 1}</span>*/}
                                            </span>
                                        </li>
                                    ))}
                                </ol>

                                <div className='grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center'>
                                    {/* Form */}
                                    <form onSubmit={handleFormSubmit}>
                                        {/* Step 1 */}
                                        {activeStep === 0 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="type" value="Select Article Type" />
                                                    <div className="">
                                                        <select
                                                            id="type"
                                                            name="type"
                                                            value={data.type}
                                                            className='mt-1 w-full md:w-1/2 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                            onChange={(e) => setData('type', e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Type</option>
                                                            {types.map((type, index) => (
                                                                <option key={index} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <InputError message={errors.type} className="mt-2" />
                                                </div>
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 2 */}
                                        {activeStep === 1 && (
                                            <div>
                                                <div className='mt-4 mb-5'>
                                                    <InputLabel2 value="Classification" />
                                                    <div className="mt-2 space-y-2">
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 5 */}
                                        {activeStep === 2 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="title" value="Title" />

                                                    <TextInput
                                                        id="title"
                                                        name="title"
                                                        value={data.title}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="title"
                                                        onChange={(e) => setData('title', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.title} className="mt-2" />
                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="abstract" value="Abstract" />

                                                    <TextArea
                                                        id="abstract"
                                                        name="abstract"
                                                        value={data.abstract}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="abstract"
                                                        onChange={(e) => setData('abstract', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.abstract} className="mt-2" />

                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="keywords" value="Keywords" />

                                                    <TextArea
                                                        id="keywords"
                                                        name="keywords"
                                                        value={data.keywords}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="keywords"
                                                        onChange={(e) => setData('keywords', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.keywords} className="mt-2" />

                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 3 */}
                                        {activeStep === 3 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                                <div>
                                                    <div className="mt-4 mb-5">
                                                        <InputLabel htmlFor="co_author1" value="Co-author 1 (optional)" />

                                                        <TextInput
                                                            id="co_author1"
                                                            name="co_author1"
                                                            value={data.co_author1}
                                                            className="mt-1 block w-full"
                                                            autoComplete="co_author1"
                                                            onChange={(e) => setData('co_author1', e.target.value)}
                                                            placeholder="Name, Email, Affiliation, Academic Title"
                                                        />

                                                        <InputError message={errors.co_author1} className="mt-2" />
                                                    </div>

                                                    <div className="mt-4 mb-5">
                                                        <InputLabel htmlFor="co_author2" value="Co-author 2 (optional)" />

                                                        <TextInput
                                                            id="co_author2"
                                                            name="co_author2"
                                                            value={data.co_author2}
                                                            className="mt-1 block w-full"
                                                            autoComplete="co_author2"
                                                            onChange={(e) => setData('co_author2', e.target.value)}
                                                            placeholder="Name, Email, Affiliation, Academic Title"
                                                        />

                                                        <InputError message={errors.co_author2} className="mt-2" />
                                                    </div>
                                                    <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                    <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3 */}
                                        {activeStep === 4 && (
                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center">
                                                <div>
                                                    {/** 
                                                    <div className="mt-4 mb-5">
                                                        <InputLabel2 htmlFor="reviewer1" value="Reviewer Preference" />

                                                        <select
                                                            id="reviewer1"
                                                            name="reviewer1"
                                                            value={data.reviewer1}
                                                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                            onChange={(e) => setData('reviewer1', e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Reviewer</option>
                                                            {users.map((user) => (
                                                                <option key={user.email} value={user.email}>
                                                                    {user.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <InputError message={errors.reviewer1} className="mt-2" />
                                                    </div>

                                                    <div className="mt-4 mb-2">
                                                        <InputLabel2 htmlFor="reviewer2" value="External Reviewer" />

                                                        <select
                                                            id="reviewer2"
                                                            name="reviewer2"
                                                            value={data.reviewer2}
                                                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                            onChange={(e) => setData('reviewer2', e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Reviewer</option>
                                                            {externalReviewers.map((externalReviewer) => (
                                                                <option key={externalReviewer.email} value={externalReviewer.email}>
                                                                    {externalReviewer.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <InputError message={errors.reviewer2} className="mt-2" />
                                                    </div>
                                                */}
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-5">Reviewer List</h3>
                                                    <div className="mt-2 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                                        <div className="flex justify-between items-center">
                                                            <div className="">
                                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">

                                                                        <tr className='bg-gray-50 dark:bg-gray-800'>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Name</td>
                                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">Affiliation</td>
                                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">Academic Title</td>

                                                                        </tr>
                                                                        {reviewers && reviewers.length > 0 ? (
                                                                            reviewers.map((reviewer, index) => (
                                                                                <tr className='bg-gray-50 dark:bg-gray-800'>
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{reviewer.name} </td>
                                                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{reviewer.affiliation}</td>
                                                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{reviewer.academicTitle}</td>

                                                                                </tr>
                                                                            ))
                                                                        ) : (<>
                                                                            <tr>
                                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400" colSpan="2"> </td>
                                                                            </tr>
                                                                        </>)}

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="mb-5">Cannot see expected reviewer? Please add <a href='#' className='text-blue-500' type='button' onClick={toggleExternalReviewerModal}>from here</a>.</p>

                                                    <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                    <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                        )}

                                        {activeStep === 5 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="editableFile" value="Editable File (e.g. doc, docx etc.)" />
                                                    <input
                                                        type="file"
                                                        id="editableFile"
                                                        name="editableFile"
                                                        className="mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('editableFile', e.target.files[0])}
                                                        required
                                                    />
                                                    <InputError message={errors.editableFile} className="mt-2" />
                                                </div>

                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="pdfFile" value="PDF file" />
                                                    <input
                                                        type="file"
                                                        id="pdfFile"
                                                        name="pdfFile"
                                                        className="mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('pdfFile', e.target.files[0])}
                                                        required
                                                    />
                                                    <InputError message={errors.pdfFile} className="mt-2" />
                                                </div>

                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="imageFile" value="ZIP File of images" />
                                                    <input
                                                        type="file"
                                                        id="imageFile"
                                                        name="imageFile"
                                                        className="mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('imageFile', e.target.files[0])}
                                                        required
                                                    />
                                                    <InputError message={errors.imageFile} className="mt-2" />
                                                </div>
                                                {/* Form fields for step 3 */}
                                                {/* Previous and Submit buttons */}
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {activeStep === 6 && (
                                            <div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="funding" value="Funding Information" />

                                                    <TextArea
                                                        id="funding"
                                                        name="funding"
                                                        value={data.funding}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="funding"
                                                        onChange={(e) => setData('funding', e.target.value)}
                                                        required
                                                        placeholder="If the research was funded, provide details about it. Otherwise write 'No'"
                                                    />

                                                    <InputError message={errors.funding} className="mt-2" />

                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="conflictsOfInterest" value="Disclosure of Conflicts of Interest" />

                                                    <TextArea
                                                        id="conflictsOfInterest"
                                                        name="conflictsOfInterest"
                                                        value={data.conflictsOfInterest}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="conflictsOfInterest"
                                                        onChange={(e) => setData('conflictsOfInterest', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.conflictsOfInterest} className="mt-2" />

                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="ethicalStatement" value="Ethical Statements" />

                                                    <TextArea
                                                        id="ethicalStatement"
                                                        name="ethicalStatement"
                                                        value={data.ethicalStatement}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="ethicalStatement"
                                                        onChange={(e) => setData('ethicalStatement', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.ethicalStatement} className="mt-2" />

                                                </div>

                                                <div className="mt-4 mb-5">
                                                    <label htmlFor="consentToPolicies" className="flex items-start">
                                                        <input
                                                            type="checkbox"
                                                            id="consentToPolicies"
                                                            name="consentToPolicies"
                                                            checked={data.consentToPolicies}
                                                            className="mr-2 mt-1"
                                                            onChange={(e) => setData('consentToPolicies', e.target.checked)}
                                                            required
                                                        />
                                                        <span>I agree to the journal's submission policies, including copyright agreements, ethical guidelines, and any specific requirements</span>
                                                    </label>
                                                    {errors.consentToPolicies && (
                                                        <p className="mt-2 text-red-600">{errors.consentToPolicies}</p>
                                                    )}
                                                </div>

                                                {/* Form fields for step 3 */}
                                                {/* Previous and Submit buttons */}
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}



                                        {activeStep === 7 && (
                                            <div>

                                                <div className="mb-5 mt-4">
                                                    <InputLabel2 htmlFor="language_option" value="If English is not your first language, has your paper been edited by a native English speaker?" />

                                                    <select
                                                        id="language_option"
                                                        name="language_option"
                                                        value={data.language_option}
                                                        className='mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('language_option', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select an option</option>
                                                        {language_options.map((option, index) => (
                                                            <option key={index} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.language_option} className="mt-2" />
                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 4 */}
                                        {activeStep === 8 && (
                                            <div>
                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="comments" value="Comments" />

                                                    <TextArea
                                                        id="comments"
                                                        name="comments"
                                                        value={data.comments}
                                                        className="mt-1 block w-full md:w-1/2"
                                                        autoComplete="comments"
                                                        onChange={(e) => setData('comments', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.comments} className="mt-2" />

                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 7: Preview Step */}
                                        {activeStep === 9 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-5">Review Your Submission</h3>
                                                <div className="mt-4 mb-5">
                                                    <p><strong>Type:</strong> {data.type}</p>
                                                    <p><strong>Classification:</strong> {classifications.join(', ')}</p>
                                                    <p><strong>Title:</strong> {data.title}</p>
                                                    <p><strong>Abstract:</strong> {data.abstract}</p>
                                                    <p><strong>Keywords:</strong> {data.keywords}</p>
                                                    <p><strong>Co-author 1:</strong> {data.co_author1}</p>
                                                    <p><strong>Co-author 2:</strong> {data.co_author2}</p>
                                                    <p><strong>Co-author 3:</strong> {data.co_author3}</p>
                                                    <p><strong>Funding:</strong> {data.funding}</p>
                                                    <p><strong>Conflicts of Interest:</strong> {data.conflictsOfInterest}</p>
                                                    <p><strong>Ethical Statement:</strong> {data.ethicalStatement}</p>
                                                    <p><strong>Consent to Policies:</strong> {data.consentToPolicies}</p>
                                                    <p><strong>Comments:</strong> {data.comments}</p>
                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton type="submit">Submit</PrimaryButton>
                                            </div>
                                        )}
                                    </form>
                                    <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                                        <div className="p-6 text-center">
                                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Success</h2>
                                            <p className='text-gray-900 dark:text-white'>{notification}</p>
                                            <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                                Close
                                            </button>
                                        </div>
                                    </Modal>
                                </div>

                            </div>
                            <div id="incomplete-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Settings Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Settings tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div id="for_approval-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submissions Waiting for Editor Approval</h3>
                                <p className="mb-2">These are your submissions currently awaiting approval from the editors. Please check back for updates.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return status === 'Pending';
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

                            </div>
                            <div id="need_revision-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submissions Needing Revision</h3>
                                <p className="mb-2">These submissions require revisions based on feedback. Make the necessary changes and resubmit for further review."</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return status === 'Revision';
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
                            </div>

                            <div id="processed-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submissions Being Processed</h3>
                                <p className="mb-2">Your manuscripts are in the review process. Monitor their progress as they move towards a decision.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return status === 'Approved';
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
                            </div>
                            <div id="accepted-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Accepted Submissions</h3>
                                <p className="mb-2">Congratulations! These submissions have been accepted for publication. Prepare for the next steps in the publication process.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return status === 'Accepted';
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
                            </div>
                            <div id="declined-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rejected Submissions</h3>
                                <p className="mb-2">These submissions were not accepted. Review feedback to improve your manuscript for future submissions.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        {papers
                                            .filter((paper) => {
                                                const status = paperStatus.find(status => status.paperID === paper.paperID)?.status || 'No Status';
                                                return status === 'Rejected';
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
                            </div>
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

                        <div className="max-h-96 overflow-y-auto space-y-4"> {/* Set max-height for the container */}
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

                            {((paperStatus.find(status => status.paperID === selectedPaper.paperID)?.status || 'No Status') === "Revision") && (
                                <div className='mt-4'>
                                    <PrimaryButton onClick={revisionsModal}>
                                        Revisions
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )}


            <Modal show={showModal3} onClose={() => setShowModal3(false)}>
                <div className="p-6">

                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Add a reviewer</h2>
                    <div className="max-h-96 overflow-y-auto"> {/* Set max-height for the table container */}


                        <form onSubmit={handleFormSubmit2}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data2.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData2('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors2.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data2.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData2('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors2.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="affiliation" value="Affiliation" />

                                <TextArea
                                    id="affiliation"
                                    name="affiliation"
                                    value={data2.affiliation}
                                    className="mt-1 block w-full"
                                    autoComplete="affiliation"
                                    onChange={(e) => setData2('affiliation', e.target.value)}
                                    required
                                />

                                <InputError message={errors2.affiliation} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="academicTitle" value="Academic Position" />

                                <TextInput
                                    id="academicTitle"
                                    name="academicTitle"
                                    value={data2.academicTitle}
                                    className="mt-1 block w-full"
                                    autoComplete="academicTitle"
                                    onChange={(e) => setData2('academicTitle', e.target.value)}
                                    required
                                />

                                <InputError message={errors2.academicTitle} className="mt-2" />
                            </div>
                            <PrimaryButton type="submit" className='mt-2'>Submit</PrimaryButton>

                        </form>
                    </div>
                </div>

            </Modal>
            <Modal show={showAddedModal} onClose={() => setShowAddedModal(false)} maxWidth="md">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Success</h2>
                    <p>Successfully added external Reviewer</p>
                    <button onClick={() => setShowAddedModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Close
                    </button>
                </div>
            </Modal>
            {selectedPaper && (
                <Modal show={revisionModal} onClose={() => setRevisionModal(false)}>
                    <h2 className="p-6 text-2xl font-semibold flex content-center text-gray-900 dark:text-gray-100">Revisions</h2>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto">

                        {reviewerFeedbacks && reviewerFeedbacks.length > 0 ? (
                            reviewerFeedbacks.map((reviewerFeedback, index) => (
                                reviewerFeedback.paperID === selectedPaper.paperID && (
                                    <div key={index} className="mt-1 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none transition-all duration-250">
                                        
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Overall Recommendation</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.overallRecommendation}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">General Comments</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.generalComments}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Detailed Feedback</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.detailedFeedback}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Critical Assessment</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.criticalAssessment}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Suggestions for Improvement</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.suggestionsForImprovement}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Summary of Findings</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.summaryOfFindings}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Assessment of Originality</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.assessmentOfOriginality}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Assessment of Clarity</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.assessmentOfClarity}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Assessment of Methodology</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.assessmentOfMethodology}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Assessment of Results</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.assessmentOfResults}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Assessment of References</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.assessmentOfReferences}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Confidential Comments to the Editor</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.confidentialCommentsToTheEditor}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Additional References or Resources</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.additionalReferencesOrResources}</td>
                                                </tr>
                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Completion Timeframe</td>
                                                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{reviewerFeedback.completionTimeframe}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ))
                        ) : (
                            <p className="text-sm text-gray-900 dark:text-gray-400">No feedback available.</p>
                        )}
                        <button onClick={() => setRevisionModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                            Close
                        </button>
                    </div>
                </Modal>
            )}



        </AuthenticatedLayout>
    );
}

