import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ExtraButton from '@/Components/PrimaryButton';

import DashboardCard from '@/Components/DashboardCard';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import Modal from '@/Components/Modal';
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">


                        {auth.user.role === "author" ? (
                            <>
                                <DashboardCard
                                    user={auth.user}
                                    route={route('addPaper.page')}
                                    imageSrc="./images/writing.png"
                                    heading="HSTU Journal"
                                    description="Click below to do all journal related work from here"
                                    buttonDescription="Journal"
                                />


                            </>
                        ) : (
                            <>

                            </>
                        )}

                        {auth.user.role === "editor" ? (
                            <>
                                <DashboardCard
                                    user={auth.user}
                                    route={route('editorApproval.page')}
                                    imageSrc="./images/writing.png"
                                    heading="Papers need approval"
                                    description="Newly uploaded papers that needs apprval to send to reviewers."
                                    buttonDescription="See Details"
                                />

                                <DashboardCard
                                    user={auth.user}
                                    route={route('approvedPapers.page')}
                                    imageSrc="./images/writing.png"
                                    heading="Approved Papers"
                                    description="Papers sent to reviewers."
                                    buttonDescription="See Details"
                                />


                            </>
                        ) : (
                            <>

                            </>
                        )}

                        {auth.user.role === "reviewer" ? (
                            <>
                                <DashboardCard
                                    user={auth.user}
                                    route={route('inReview.page')}
                                    imageSrc="./images/writing.png"
                                    heading="In Review"
                                    description="Newly uploaded papers that needs apprval to send to reviewers."
                                    buttonDescription="See Details"
                                />
                                {/*
                                <DashboardCard
                                    user={auth.user}
                                    route={route('addPaper.page')}
                                    imageSrc="./images/writing.png"
                                    heading="Reviewed papers"
                                    description="Papers sent back from reviewers."
                                    buttonDescription="See Details"
                                />
                                */}


                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
