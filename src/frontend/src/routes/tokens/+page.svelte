<script lang="ts">
    import { SnsGovernanceCanister, SnsRootCanister, type SnsGetNeuronParams } from "@dfinity/sns";
    import { ActorFactory } from "../../utils/ActorFactory";
    import type { NervousSystemParameters, Neuron } from "@dfinity/sns/dist/candid/sns_governance";
    import { Principal } from "@dfinity/principal";
    import { hexStringToUint8Array, uint8ArrayToHexString } from "@dfinity/utils";
    import Layout from "../Layout.svelte";

    let neuronIdInput = "";
    let neuron: Neuron | null = null;
    let errorMessage = "";
    let sns_parameters: NervousSystemParameters | null  = null;

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

            const { getNeuron, metadata, nervousSystemParameters } = SnsGovernanceCanister.create({
                agent,
                canisterId: Principal.fromText("detjl-sqaaa-aaaaq-aacqa-cai")
            });

            sns_parameters = await nervousSystemParameters({ certified: false});
            console.log("sns_parameters")
            console.log(sns_parameters)
            const params: SnsGetNeuronParams = { neuronId: { id: hexStringToUint8Array(neuronIdInput) } };
            const response = await getNeuron(params);
            console.log("response")
            console.log(response)
            neuron = response ?? null;
            if (!neuron) {
                errorMessage = "Neuron not found.";
            }



        } catch (error) {
            console.error(error);
            errorMessage = "Error fetching neuron.";
        }
    }
</script>

<Layout>
    <div class="p-4 max-w-md mx-auto">
        <div class="mb-4 flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                placeholder="Enter Neuron ID"
                bind:value={neuronIdInput}
                class="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
                on:click={searchNeuron}
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </div>

        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}

        {#if neuron}
            <div class="bg-gray-800 text-white p-4 rounded-md shadow">
                <h2 class="text-xl font-bold mb-2">Neuron Details</h2>
                <p><strong>ID:</strong> {uint8ArrayToHexString(neuron.id[0]?.id ?? [])}</p>
                <p><strong>Neuron Created:</strong> {new Date(Number(neuron.created_timestamp_seconds) * 1000).toLocaleString()}</p>
                <p>
                    <strong>Staked FPL:</strong> 
                    {
                        (Number(neuron.cached_neuron_stake_e8s) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }
                </p>
                <p>
                    <strong>Staked FPL Maturity:</strong> 
                    {
                        ((Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }</p>
                <p><strong>Voting Power % Multiplier:</strong> {neuron.voting_power_percentage_multiplier}%</p>

                <p>
                    <strong>Max Neuron Age for Age Bonus:</strong> {Math.floor((Number(sns_parameters?.max_neuron_age_for_age_bonus)) / 60 / 60 / 24)} days
                </p>

                <p>
                    <strong>Neuron Age:</strong> { Math.floor((Date.now() / 1000 - Number(neuron.created_timestamp_seconds)) / 60 / 60 / 24) } days
                </p>

                <p>Age Bonus: {Date.now() / 1000 - Number(neuron.created_timestamp_seconds) > Number(sns_parameters?.max_neuron_age_for_age_bonus) ? "25" : "0"}%</p>

                <p>Total Voting Power: {
                        (Date.now() / 1000 - Number(neuron.created_timestamp_seconds) > Number(sns_parameters?.max_neuron_age_for_age_bonus)) ?
                            (((
                                Number(neuron.cached_neuron_stake_e8s) + 
                                Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)
                            ) 
                            * (1.25) 
                            * (1 + (Number(neuron.voting_power_percentage_multiplier) / 100))) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                        : 
                            (((
                                Number(neuron.cached_neuron_stake_e8s) + 
                                Number(neuron.staked_maturity_e8s_equivalent[0] ?? 0)) 
                                * (1 + (Number(neuron.voting_power_percentage_multiplier) / 100)
                            )) / 100_000_000).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) 
                    } </p>

                <p>% of active votes</p>
                <p>GOLF / BOOK / BEATs %</p>
            </div>
        {/if}
    </div>
</Layout>
