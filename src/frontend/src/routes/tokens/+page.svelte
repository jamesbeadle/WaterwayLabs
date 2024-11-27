<script lang="ts">
    import { SnsGovernanceCanister, SnsRootCanister, type SnsGetNeuronParams, type SnsListProposalsParams } from "@dfinity/sns";
    import { ActorFactory } from "../../utils/ActorFactory";
    import type { NervousSystemParameters, Neuron } from "@dfinity/sns/dist/candid/sns_governance";
    import { Principal } from "@dfinity/principal";
    import { hexStringToUint8Array, uint8ArrayToHexString } from "@dfinity/utils";
    import Layout from "../Layout.svelte";

    let neuronIdInput = "";
    let neuron: Neuron | null = null;
    let errorMessage = "";
    let sns_parameters: NervousSystemParameters | null  = null;
    let votePercentage = 0;

    async function searchNeuron() {
        errorMessage = "";
        neuron = null; 

        if (!neuronIdInput) {
            errorMessage = "Please enter a neuron ID.";
            return;
        }

        try {
            const agent: any = await ActorFactory.getGovernanceAgent();
            if (process.env.DFX_NETWORK !== "ic") {
                await agent.fetchRootKey();
            }

            const { getNeuron, listProposals, nervousSystemParameters } = SnsGovernanceCanister.create({
                agent,
                canisterId: Principal.fromText("detjl-sqaaa-aaaaq-aacqa-cai")
            });

            sns_parameters = await nervousSystemParameters({ certified: false});
            const params: SnsGetNeuronParams = { neuronId: { id: hexStringToUint8Array(neuronIdInput) } };
            const response = await getNeuron(params);
            neuron = response ?? null;
            console.log("Found neuron")
            console.log(neuron)
            if (!neuron) {
                errorMessage = "Neuron not found.";
            }

            const listParams: SnsListProposalsParams = {  };
            let latestProposals = await listProposals(listParams);
            let latestProposal = latestProposals.proposals[0];
            let totalVotes = Number(latestProposal.latest_tally[0]?.total) / 100_000_000;
            console.log("total votes")
            console.log(totalVotes)
            let neuronVotingPower = getVotingPower(neuron);
            console.log("neuron voting power")
            console.log(neuronVotingPower)
            let yourPercentage = neuronVotingPower / Number(totalVotes);
            votePercentage = yourPercentage;
            console.log(yourPercentage)
            console.log(`This neuron holds ${((yourPercentage) * 100).toFixed(4)}% of the vote.`)

        } catch (error) {
            console.error(error);
            errorMessage = "Error fetching neuron.";
        }
    }

    
    function getVotingPower(neuron: Neuron) : number {
        
        let qualifiesForAgeBonus = Date.now() / 1000 - Number(neuron.created_timestamp_seconds) > Number(sns_parameters?.max_neuron_age_for_age_bonus);
        
        if(qualifiesForAgeBonus){
            return ((
                Number(neuron.cached_neuron_stake_e8s) + 
                Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)
                )  * (1.25) 
                * (1 + (Number(neuron.voting_power_percentage_multiplier) / 100))) / 100_000_000;
        }

        return ((
            Number(neuron.cached_neuron_stake_e8s) + 
            Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)) 
            * (1 + (Number(neuron.voting_power_percentage_multiplier) / 100)
        )) / 100_000_000;
    }
</script>

<Layout>
    <div class="p-4">
        <div class="mb-4 flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                placeholder="Enter Neuron ID"
                bind:value={neuronIdInput}
                class="flex-grow p-2 border rounded text-black"
            />
            <button
                on:click={searchNeuron}
                class="brand-button"
            >
                Search
            </button>
        </div>

        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}

        {#if neuron}
            <div class="bg-BrandGray text-white p-4 rounded-md shadow">
                <h2 class="text-xl font-bold mb-2">Neuron Details</h2>
                <p class="text-xxs"><strong>Neuron ID:</strong> {uint8ArrayToHexString(neuron.id[0]?.id ?? [])}</p>
                <p class="text-xxs"><strong>Neuron Created:</strong> {new Date(Number(neuron.created_timestamp_seconds) * 1000).toLocaleString()}</p>
                <p>
                    <strong>Staked FPL:</strong> 
                    {
                        (Number(neuron.cached_neuron_stake_e8s) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }
                </p>
                <p class="text-sm mb-4">
                    <strong>Staked FPL Maturity:</strong> 
                    {
                        ((Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }</p>
                <p class="text-xs"><strong>VP Multiplier:</strong> {neuron.voting_power_percentage_multiplier}%</p>

                <p  class="text-xs mb-4">Age Bonus: {Date.now() / 1000 - Number(neuron.created_timestamp_seconds) > Number(sns_parameters?.max_neuron_age_for_age_bonus) ? "25" : "0"}%</p>

                <p class="mb-4">Total Voting Power: { getVotingPower(neuron) } ({((votePercentage) * 100).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}%)</p>

                <p>$BOOK Tokens: {(10_000_000 * votePercentage).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</p>
                <p>$GOLF Tokens: {(10_000_000 * votePercentage).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</p>
                <p>$BEAT Tokens: {(10_000_000 * votePercentage).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</p>

            </div>
        {/if}
    </div>
</Layout>
