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

export default function EditorApproval({ message, auth }) {
    const { users, papers, paperStatus, externalReviewers } = usePage().props;

    const [showModal2, setShowModal2] = useState(false);
    const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        paperID: '',
        reviewer: '',
    });

    const openModalWithPaper = (paper) => {
        setSelectedPaper(paper);
        setShowModal2(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        const formData = {
            paperID: selectedPaper.paperID,
            reviewer: data.reviewer,
        }
        router.post(route('setReviewer'), formData, {
            onSuccess: () => {
                setShowStatusChangeModal(true);
            },
            onError: () => {
                console.log("Error");
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
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Papers need approval</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    The following papers need approval of you:
                                </p>
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
                            </header>
                        </div>
                    </div>
                </div>
            </div>
            {selectedPaper && (
                <Modal show={showModal2} onClose={() => setShowModal2(false)}>
                    <div className="p-6">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                            {paperStatus.find(status => status.paperID === selectedPaper.paperID)?.status || 'No Status'}
                        </span>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{selectedPaper.title}</h2>
                        <div className="max-h-96 overflow-y-auto"> {/* Set max-height for the table container */}


                            <p className="mt-4 font-mediumtext-sm text-gray-600 dark:text-gray-400"><u>Abstract</u></p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.abstract}</p>
                            <p className="mt-4 font-mediumtext-sm text-gray-600 dark:text-gray-400"><u>Comments</u></p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.comments}</p>
                            <p className="mt-4 font-mediumtext-sm text-gray-600 dark:text-gray-400"><u>Reviewer</u></p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{selectedPaper.reviewer1}</p>
                            <a href={route('editableFile.download', { id: selectedPaper.paperID })} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-700">Download</a>

                            <a href={route('pdfFile.download', { id: selectedPaper.paperID })} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-700">Download</a>


                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mt-4 mb-5">
                                <InputLabel2 htmlFor="paperID" value="Paper ID" />

                                <TextInput
                                    id="paperID"
                                    name="paperID"
                                    value={selectedPaper.paperID}
                                    className="mt-1 block w-full md:w-1/2"
                                    autoComplete="paperID"
                                    onChange={(e) => setData('paperID', e.target.value)}
                                    required
                                    disabled
                                />

                                <InputError message={errors.paperID} className="mt-2" />
                            </div>
                            <div className="mt-4 mb-2">
                                <InputLabel2 htmlFor="reviewer" value="Select Reviewer" />

                                <select
                                    id="reviewer"
                                    name="reviewer"
                                    value={data.reviewer}
                                    className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                    onChange={(e) => setData('reviewer', e.target.value)}
                                    required
                                >
                                    <option value="">Select Reviewer</option>
                                    {externalReviewers.map((externalReviewer) => (
                                        <option key={externalReviewer.email} value={externalReviewer.email}>
                                            {externalReviewer.name}
                                        </option>
                                    ))}
                                </select>

                                <InputError message={errors.reviewer} className="mt-2" />
                            </div>
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </form>

                        {/*
                        <SecondaryButton onClick={() => handleFormSubmit(selectedPaper.paperID)}>
                            Button
                        </SecondaryButton>
                                */}

                    </div>

                </Modal>
            )}
            <Modal show={showStatusChangeModal} onClose={() => setShowStatusChangeModal(false)} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Status Changed</h2>
                    <p className="text-md text-gray-900 dark:text-gray-100">Pending &rarr; Reviewing</p>
                </div>
            </Modal>


        </AuthenticatedLayout>
    );
}

