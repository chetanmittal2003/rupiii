"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { toast } from 'react-toastify';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);

    const handleAddMoney = async () => {
        try {
            // Fetch the token from the API
            const tokenResponse = await fetch('/api/getToken');
            const tokenData = await tokenResponse.json();

            if (!tokenResponse.ok) {
                toast.error(tokenData.message || "Failed to fetch token.");
                return;
            }

            const token = tokenData.token;
            const userId = tokenData.userId;
            const amount = tokenData.amount;

            // Call the webhook logic to add money to the balance
            const response = await fetch('http://localhost:3003/hdfcWebhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    user_identifier: userId,
                    amount: amount
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Money added successfully!");
                window.location.href = redirectUrl || "";
            } else {
                toast.error(data.message || "Failed to add money.");
            }
        } catch (error) {
            toast.error("Error while adding money!");
        }
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
                    setValue(Number(val));
                }} />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-between pt-4 px-4">
                    
                    <Button onClick={async () => {
                        await createOnRampTransaction(provider, value);
                        window.location.href = redirectUrl || "";
                    }}>
                        Initiate Transaction
                    </Button>
                    <Button onClick={handleAddMoney}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
};