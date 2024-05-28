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

export default function ApprovedPapers({ message, auth }) {
    const { users, papers, paperStatus, reviewerAcceptDecline, externalReviewers } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);

    const [notification, setNotification] = useState(null);

    
    const [selectedPaper, setSelectedPaper] = useState(null);      
    

    const openModalWithPaper = (paper) => {
        router.get(route('specificPaper.page',{paper_id: paper.paperID}))
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
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Submissions You've Approved</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    The following Submissions are approved by you:
                                </p>
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

                    </div>

                </Modal>
            )}


        </AuthenticatedLayout>
    );
}

