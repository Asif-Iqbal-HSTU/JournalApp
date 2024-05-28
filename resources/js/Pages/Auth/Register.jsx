import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        role: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword_, setShowPassword_] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Register as" />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="">Select role</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="publisher">Publisher</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="relative mt-1 w-full">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility based on showPassword state
                            name="password"
                            value={data.password}
                            className="pr-10 pl-2 py-2 rounded-md w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {/* Password toggle button */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-4 py-2 rounded-md focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        >
                            <
                                FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}
                                className="text-gray-600 dark:text-gray-400"
                            />

                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <div className="relative mt-1 w-full">
                        <TextInput
                            id="password_confirmation"
                            type={showPassword_ ? 'text' : 'password'} // Toggle password visibility based on showPassword state
                            name="password"
                            value={data.password_confirmation}
                            className="pr-10 pl-2 py-2 rounded-md w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {/* Password toggle button */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-4 py-2 rounded-md focus:outline-none"
                            onClick={() => setShowPassword_(!showPassword_)} // Toggle showPassword_ state
                        >
                            <
                                FontAwesomeIcon icon={showPassword_ ? faEye : faEyeSlash}
                                className="text-gray-600 dark:text-gray-400"
                            />

                        </button>
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
