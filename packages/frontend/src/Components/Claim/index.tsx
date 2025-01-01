import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { AidleTokenABI } from '../../contracts/AidleToken.ts';
import { useState } from 'react';

const AIDLE_CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const MINT_PRICE = 1;

function Claim() {
    const { isConnected, address } = useAccount()
    const [ error, setError ] = useState<string | null>(null);

    //const { data: hash, writeContract, isPending } = useWriteContract()
    const { data: approveHash, writeContract: approve, isPending: isApprovePending } = useWriteContract();
    const { data: claimHash, writeContract: claim, isPending: isClaimPending } = useWriteContract();

    const SendRequest = async () => {
        try {
            if (!isConnected || !address) throw new Error('User Disconnected');
            setError(null);

            approve({
                address: AIDLE_CONTRACT_ADDRESS,
                abi: AidleTokenABI,
                functionName: 'setApprovalForAll',
                args: [AIDLE_CONTRACT_ADDRESS, true],
            })

            claim({
                address: AIDLE_CONTRACT_ADDRESS,
                abi: AidleTokenABI,
                functionName: 'claim',
                args: [],
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Claim error:', error);
            setError(error.message);
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
        hash: claimHash
    })

    const { isSuccess: isApproved} = 
    useWaitForTransactionReceipt({
        hash: approveHash
    })

    return (
        <div>
            <button onClick={SendRequest} disabled={isClaimPending}>
                {isClaimPending || isApprovePending ? 'Waiting...' : 'Claim'}
            </button>
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Your claim is successful!</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        </div>
    );
};

export default Claim;
