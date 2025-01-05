"use client";

import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <header className="text-center mb-10 mt-10">
                <h1 className="text-5xl font-bold text-[#6a51a6]">Welcome to FinTech App</h1>
                <p className="mt-4 mb-10 text-lg text-gray-600">Your one-stop solution for managing finances.</p>
                <Button className="mb-10" onClick={() => alert("Get Started")}>Get Started</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mb-10">
                <Card title="Instant Transfers">
                    <p className="text-gray-700">Send and receive money instantly with our secure platform.</p>
                    <Button onClick={() => alert("Transfer Money")}>Transfer Now</Button>
                </Card>

                <Card title="Track Your Spending">
                    <p className="text-gray-700">Get insights into your spending habits and manage your budget effectively.</p>
                    <Button onClick={() => alert("View Spending")}>View Spending</Button>
                </Card>

                <Card title="Secure Savings">
                    <p className="text-gray-700">Save for your future with our high-interest savings accounts.</p>
                    <Button onClick={() => alert("Start Saving")}>Start Saving</Button>
                </Card>
            </div>

            <section className="text-center mb-10">
                <h2 className="text-3xl font-semibold text-[#6a51a6]">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-gray-600">We provide a range of services to help you manage your finances effectively:</p>
                <ul className="mt-4 text-left max-w-2xl mx-auto space-y-2">
                    <li className="flex items-center">
                        <span className="text-green-500">✔️</span>
                        <span className="ml-2">User-friendly interface for easy navigation.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500">✔️</span>
                        <span className="ml-2">Robust security measures to protect your data.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500">✔️</span>
                        <span className="ml-2">24/7 customer support to assist you anytime.</span>
                    </li>
                </ul>
            </section>

            <footer className="w-full text-gray-600 py-6 mt-10">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold">Join Us Today!</h3>
                    <p className="mt-2">Take control of your finances with our innovative solutions.</p>
                    <Button className="mt-4" onClick={() => alert("Sign Up")}>Sign Up</Button>
                </div>
                <div className="mt-4 text-sm">
                    <p>© 2024 Rupii. All rights reserved.</p>
                    <p>Privacy Policy | Terms of Service</p>
                </div>
            </footer>
        </div>
    );
}