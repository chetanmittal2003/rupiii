import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    
    const transactions = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return transactions.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        from: t.fromUserId,
        to: t.toUserId,
        isDeduction: t.fromUserId === userId
    }));
}

export default async function() {
    const p2pTransactions = await getP2PTransactions();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
                {p2pTransactions.length === 0 ? (
                    <div>No P2P transactions found.</div>
                ) : (
                    p2pTransactions.map((txn, index) => (
                        <div key={index} className="border p-4 rounded-lg">
                            <div>Time: {txn.time.toString()}</div>
                            <div>Amount: {txn.isDeduction ? `- Rs ${txn.amount / 100}` : `+ Rs ${txn.amount / 100}`} INR</div>
                            <div>From User ID: {txn.from}</div>
                            <div>To User ID: {txn.to}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}