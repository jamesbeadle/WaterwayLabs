import MopsCanisterIds "mo:waterway-mops/CanisterIds";
module Environment {

    public let APPROVED_CANISTERS = [
        MopsCanisterIds.ICFC_BACKEND_CANISTER_ID,
        MopsCanisterIds.FOOTBALL_GOD_BACKEND_CANISTER_ID,
        MopsCanisterIds.OPENFPL_BACKEND_CANISTER_ID,
        MopsCanisterIds.OPENWSL_BACKEND_CANISTER_ID,
        MopsCanisterIds.JEFF_BETS_BACKEND_CANISTER_ID,
        MopsCanisterIds.OPENBOOK_BACKEND_CANISTER_ID,
        MopsCanisterIds.TRANSFER_KINGS_BACKEND_CANISTER_ID,
        MopsCanisterIds.ICFC_DATA_CANISTER_ID,
    ];

    public let JB_PRINCIPAL_ID = "nc2sn-3ecqa-a4kts-jdbsy-pewiy-uavg4-kaxkf-qftut-sb7hv-6nlyb-2qe";

    public let ADMIN_PRINCIPAL_IDS = [JB_PRINCIPAL_ID];

    public let MASTER_PRINCIPAL_ID = "nc2sn-3ecqa-a4kts-jdbsy-pewiy-uavg4-kaxkf-qftut-sb7hv-6nlyb-2qe";
    public let MANAGER_PRINCIPAL_IDS = [MASTER_PRINCIPAL_ID, "l6og7-wcre5-hpuzu-6l7cs-wzage-23q7o-h4tj5-newmg-feqf4-xnvbc-tqe", "hu7wv-h3szc-cmatb-zq5hd-zbyqs-ubaav-vhr3p-uynin-e2cxh-mhlod-uae", "kmepn-s7fu2-niy7r-qzgne-cwrzh-fm2iz-2d3ph-jcakt-bakuu-ng6i2-2qe"];
    public let DEVELOPER_PRINCIPAL_IDS = [MASTER_PRINCIPAL_ID, "vsllk-m63mu-vzd4t-ixg7q-3cegi-asxvs-iowqp-l4qob-mwpui-jtjy2-uae"];
    public let AI_DEVELOPER_PRINCIPAL_IDS = [MASTER_PRINCIPAL_ID, "k7emk-fuaz4-svxty-lyunu-iuxix-5evlj-pmcfy-nb6dd-gnval-lpfvl-xae"];
};
