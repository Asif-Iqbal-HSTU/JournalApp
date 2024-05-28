import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const DashboardCard = ({ user, route, imageSrc, heading, description, buttonDescription }) => {
    return (
        <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
            <div>
                <div className="h-14 w-14 bg-green-800/20 dark:bg-white-1200/100 flex items-center justify-center rounded-full">
                    <img src={imageSrc} alt="Description of the image" />
                </div>

                <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {heading}
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                    {user && (
                        <Link href={route}>
                            <PrimaryButton>
                                {buttonDescription}
                            </PrimaryButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

DashboardCard.propTypes = {
    user: PropTypes.bool, // Assuming user is a boolean prop
    route: PropTypes.string, // Assuming route is a string prop
    imageSrc: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonDescription: PropTypes.string.isRequired
};

export default DashboardCard;