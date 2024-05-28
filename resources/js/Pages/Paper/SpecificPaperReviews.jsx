import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputLabel2 from '@/Components/InputLabel2';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import Modal from '@/Components/Modal';

export default function ApprovedPapers({ message, auth }) {
    const { users, papers, paperStatus, reviewerAcceptDecline, externalReviewers, paper, reviewerFeedbacks, reviewerAcceptDeclines } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        paperID: paper.paperID,
        status: '',
    });

    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, reset: reset2 } = useForm({
        paperID: paper.paperID,
        reviewer: '',
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            paperID: data.paperID,
            status: data.status,
        };

        router.post(route('approvedtodecision', { paper_id: data.paperID }), formData, {
            onSuccess: () => {
                setShowModal(true);
                console.log('Modal shown:', showModal);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleFormSubmit2 = (e) => {
        e.preventDefault();
        const formData = {
            paperID: data2.paperID,
            reviewer: data2.reviewer,
        };

        router.post(route('setReviewer'), formData, {
            onSuccess: () => {
                setShowStatusChangeModal(true);
                console.log('Status change modal shown:', showStatusChangeModal);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
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
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{paper.title}</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{paper.paperID}</p>
                            </header>
                            {reviewerAcceptDeclines && reviewerAcceptDeclines.length > 0 ? (
                                <div className="mt-5 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                    <div className="mb-1">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">All reviewers and their states</h2>
                                        <div>
                                            {reviewerAcceptDeclines.map((reviewerAcceptDecline, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <table className="min-w-1/3 divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                            <tr className='bg-gray-50 dark:bg-gray-800'>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{reviewerAcceptDecline.reviewer}</td>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{reviewerAcceptDecline.state}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-5 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No reviewers found</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">There are currently no reviewers available.</p>
                                </div>
                            )}

                            {reviewerFeedbacks && reviewerFeedbacks.length > 0 ? (
                                reviewerFeedbacks.map((reviewerFeedback, index) => (
                                    <div key={index} className="mt-5 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{reviewerFeedback.reviewer}</h2>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                        <tr className='bg-gray-50 dark:bg-gray-800'>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Overall Recommendation</td>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{reviewerFeedback.overallRecommendation}</td>
                                                        </tr>
                                                        <tr className='bg-gray-50 dark:bg-gray-800'>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">General Comments</td>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{reviewerFeedback.generalComments}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="mt-5 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No feedback found</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">There are currently no feedback available.</p>
                                </div>
                            )}

                            {reviewerAcceptDeclines && reviewerAcceptDeclines.some(reviewerAcceptDecline => reviewerAcceptDecline.state === "decline") && (
                                <>
                                    <div className="mt-5 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">

                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Previous Reviewer Declined to Review.</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Change reviewer from here.</p>
                                        <form onSubmit={handleFormSubmit2}>
                                            <div className="mt-4 mb-5">
                                                <InputLabel2 htmlFor="paperID" value="Paper ID" />
                                                <TextInput
                                                    id="paperID"
                                                    name="paperID"
                                                    value={paper.paperID}
                                                    className="mt-1 block w-full md:w-1/2"
                                                    autoComplete="paperID"
                                                    onChange={(e) => setData2('paperID', e.target.value)}
                                                    required
                                                    disabled
                                                />
                                                <InputError message={errors2.paperID} className="mt-2" />
                                            </div>
                                            <div className="mt-4 mb-2">
                                                <InputLabel2 htmlFor="reviewer" value="Select Reviewer" />
                                                <select
                                                    id="reviewer"
                                                    name="reviewer"
                                                    value={data2.reviewer}
                                                    className='mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                    onChange={(e) => setData2('reviewer', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Reviewer</option>
                                                    {externalReviewers.map((externalReviewer) => (
                                                        <option key={externalReviewer.email} value={externalReviewer.email}>
                                                            {externalReviewer.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors2.reviewer} className="mt-2" />
                                            </div>
                                            <PrimaryButton type="submit">Submit</PrimaryButton>
                                        </form>
                                    </div>
                                </>
                            )}

                            <Modal show={showStatusChangeModal} onClose={() => setShowStatusChangeModal(false)} maxWidth="md">
                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Reviewer Changed</h2>
                                    <p className="text-md text-gray-900 dark:text-gray-100">OKAY</p>
                                </div>
                            </Modal>

                            <div className="mt-5 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div className="">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Take Your Decision for this paper</h2>
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="mt-4 mb-5">
                                                <InputLabel htmlFor="status" value="Update Status" />
                                                <select
                                                    id="status"
                                                    name="status"
                                                    value={data.status}
                                                    className='mt-1 block w-full md:w-1/2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Revision">Revision</option>
                                                    <option value="Accepted">Accept</option>
                                                    <option value="Rejected">Reject</option>
                                                </select>
                                                <InputError message={errors.status} className="mt-2" />
                                            </div>
                                            <PrimaryButton type="submit">Submit</PrimaryButton>
                                        </form>
                                        <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                                            <div className="p-6">
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Status Changed</h2>
                                                <p className="text-md text-gray-900 dark:text-gray-100">OKAY</p>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
