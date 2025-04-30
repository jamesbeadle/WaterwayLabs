import Result "mo:base/Result";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Option "mo:base/Option";
import AppTypes "../types/app_types";
import SupportQueryQueries "../queries/support_query_queries";
import SupportQueryCommands "../commands/support_query_commands";
import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import BaseUtilities "mo:waterway-mops/BaseUtilities";
import Environment "../environment";

module {
    public class SupportQueriesManager() {

        private var supportQueries : [AppTypes.SupportQuery] = [];
        private var archivedSupportQueries : [AppTypes.SupportQuery] = [];
        private var supportQueryId : Nat = 1;

        public func getStableSupportQueries() : [AppTypes.SupportQuery] {
            supportQueries;
        };
        public func setStableSupportQueries(stable_support_queries : [AppTypes.SupportQuery]) {
            supportQueries := stable_support_queries;
        };

        public func getStableArchivedSupportQueries() : [AppTypes.SupportQuery] {
            archivedSupportQueries;
        };
        public func setStableArchivedSupportQueries(stable_archived_support_queries : [AppTypes.SupportQuery]) {
            archivedSupportQueries := stable_archived_support_queries;
        };

        public func getStableSupportQueryId() : Nat {
            supportQueryId;
        };
        public func setStableSupportQueryId(stable_support_query_id : Nat) {
            supportQueryId := stable_support_query_id;
        };

        public func getSupportQueries(dto : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            var res : [SupportQueryQueries.SupportQuery] = Array.map(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : SupportQueryQueries.SupportQuery {
                    return {
                        id = supportQuery.id;
                        name = supportQuery.name;
                        message = supportQuery.message;
                        contact = supportQuery.contact;
                        status = supportQuery.status;
                        submittedBy = supportQuery.submittedBy;
                        submittedOn = supportQuery.submittedOn;
                        assignedTo = supportQuery.assignedTo;
                        app = supportQuery.app;
                    };
                },
            );

            switch (dto.app) {
                case (?app) {
                    let ?appText = BaseUtilities.appToText(app) else {
                        return #err(#InvalidData);
                    };
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return Text.equal(supportQuery.app, appText);
                        },
                    );
                };
                case (_) {};
            };

            switch (dto.status) {
                case (?status) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.status == status;
                        },
                    );
                };
                case (_) {};
            };

            switch (dto.dateFrom) {
                case (?dateFrom) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn >= dateFrom;
                        },
                    );
                };
                case (_) {};
            };
            switch (dto.dateTo) {
                case (?dateTo) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn <= dateTo;
                        },
                    );
                };
                case (_) {};
            };

            let rowsPerPage = Environment.ROWS_PER_PAGE;
            let startIndex = Nat.min(dto.page - 1 * rowsPerPage, Array.size(res));
            let endIndex = Nat.min((dto.page) * rowsPerPage, Array.size(res));
            let paginatedRes = Array.slice(res, startIndex, endIndex);

            return #ok({
                totalEntries = Array.size(res);
                page = dto.page;
                app = dto.app;
                supportQueries = Iter.toArray(paginatedRes);
            });
        };

        public func getArchivedSupportQueries(dto : SupportQueryQueries.GetArchivedSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            var res : [SupportQueryQueries.SupportQuery] = Array.map(
                archivedSupportQueries,
                func(supportQuery : AppTypes.SupportQuery) : SupportQueryQueries.SupportQuery {
                    return {
                        id = supportQuery.id;
                        name = supportQuery.name;
                        message = supportQuery.message;
                        contact = supportQuery.contact;
                        status = supportQuery.status;
                        submittedBy = supportQuery.submittedBy;
                        submittedOn = supportQuery.submittedOn;
                        assignedTo = supportQuery.assignedTo;
                        app = supportQuery.app;
                    };
                },
            );

            switch (dto.app) {
                case (?app) {
                    let ?appText = BaseUtilities.appToText(app) else {
                        return #err(#InvalidData);
                    };
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return Text.equal(supportQuery.app, appText);
                        },
                    );
                };
                case (_) {};
            };

            let rowsPerPage = Environment.ROWS_PER_PAGE;
            let startIndex = Nat.min(dto.page - 1 * rowsPerPage, Array.size(res));
            let endIndex = Nat.min((dto.page) * rowsPerPage, Array.size(res));
            let paginatedRes = Array.slice(res, startIndex, endIndex);

            return #ok({
                totalEntries = Array.size(res);
                page = dto.page;
                app = dto.app;
                supportQueries = Iter.toArray(paginatedRes);
            });

        };

        public func getUserSupportQueries(dto : SupportQueryQueries.GetUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            var res : [SupportQueryQueries.SupportQuery] = Array.map(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : SupportQueryQueries.SupportQuery {
                    return {
                        id = supportQuery.id;
                        name = supportQuery.name;
                        message = supportQuery.message;
                        contact = supportQuery.contact;
                        status = supportQuery.status;
                        submittedBy = supportQuery.submittedBy;
                        submittedOn = supportQuery.submittedOn;
                        assignedTo = supportQuery.assignedTo;
                        app = supportQuery.app;
                    };
                },
            );
            switch (dto.status) {
                case (?status) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.status == status;
                        },
                    );
                };
                case (_) {};
            };
            switch (dto.dateFrom) {
                case (?dateFrom) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn >= dateFrom;
                        },
                    );
                };
                case (_) {};
            };
            switch (dto.dateTo) {
                case (?dateTo) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn <= dateTo;
                        },
                    );
                };
                case (_) {};
            };
            let rowsPerPage = Environment.ROWS_PER_PAGE;
            let startIndex = Nat.min(dto.page - 1 * rowsPerPage, Array.size(res));
            let endIndex = Nat.min((dto.page) * rowsPerPage, Array.size(res));
            let paginatedRes = Array.slice(res, startIndex, endIndex);
            return #ok({
                totalEntries = Array.size(res);
                page = dto.page;
                app = ?#OpenFPL;
                supportQueries = Iter.toArray(paginatedRes);
            });

        };

        public func getArchivedUserSupportQueries(dto : SupportQueryQueries.GetArchivedUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            var res : [SupportQueryQueries.SupportQuery] = Array.map(
                archivedSupportQueries,
                func(supportQuery : AppTypes.SupportQuery) : SupportQueryQueries.SupportQuery {
                    return {
                        id = supportQuery.id;
                        name = supportQuery.name;
                        message = supportQuery.message;
                        contact = supportQuery.contact;
                        status = supportQuery.status;
                        submittedBy = supportQuery.submittedBy;
                        submittedOn = supportQuery.submittedOn;
                        assignedTo = supportQuery.assignedTo;
                        app = supportQuery.app;
                    };
                },
            );
            switch (dto.status) {
                case (?status) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.status == status;
                        },
                    );
                };
                case (_) {};
            };
            switch (dto.dateFrom) {
                case (?dateFrom) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn >= dateFrom;
                        },
                    );
                };
                case (_) {};
            };
            switch (dto.dateTo) {
                case (?dateTo) {
                    res := Array.filter(
                        res,
                        func(supportQuery : SupportQueryQueries.SupportQuery) : Bool {
                            return supportQuery.submittedOn <= dateTo;
                        },
                    );
                };
                case (_) {};
            };
            let rowsPerPage = Environment.ROWS_PER_PAGE;
            let startIndex = Nat.min(dto.page - 1 * rowsPerPage, Array.size(res));
            let endIndex = Nat.min((dto.page) * rowsPerPage, Array.size(res));
            let paginatedRes = Array.slice(res, startIndex, endIndex);
            return #ok({
                totalEntries = Array.size(res);
                page = dto.page;
                app = ?#OpenFPL;
                supportQueries = Iter.toArray(paginatedRes);
            });
        };

        public func createSupportQuery(submittedBy : Ids.PrincipalId, dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            let validateResult = validate(dto);
            switch (validateResult) {
                case (#ok(_)) {
                    let ?appText = BaseUtilities.appToText(dto.app) else {
                        return #err(#InvalidData);
                    };
                    let newSupportQuery : AppTypes.SupportQuery = {
                        id = supportQueryId;
                        name = dto.name;
                        message = dto.message;
                        contact = dto.contact;
                        status = #New;
                        submittedBy = submittedBy;
                        submittedOn = Time.now();
                        assignedTo = "";
                        app = appText;
                        comments = [];
                    };
                    supportQueries := Array.append(supportQueries, [newSupportQuery]);
                    supportQueryId := supportQueryId + 1;
                    return #ok(());
                };
                case (#err(err)) {
                    return #err(err);
                };
            };

        };

        public func archiveSupportQuery(dto : SupportQueryCommands.ArchiveSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            let ?supportQuery = Array.find(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : Bool {
                    return supportQuery.id == dto.supportQueryId;
                },
            ) else {
                return #err(#NotFound);
            };

            archivedSupportQueries := Array.append(archivedSupportQueries, [supportQuery]);
            supportQueries := Array.filter(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : Bool {
                    return supportQuery.id != dto.supportQueryId;
                },
            );
            return #ok(());
        };

        public func addSupportQueryComment(commenterId : Ids.PrincipalId, dto : SupportQueryCommands.AddSupportQueryComment) : async Result.Result<(), MopsEnums.Error> {
            let ?supportQuery = Array.find(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : Bool {
                    return supportQuery.id == dto.supportQueryId;
                },
            ) else {
                return #err(#NotFound);
            };

            let newComment : AppTypes.SupportQueryComment = {
                commentId = Array.size(supportQuery.comments) + 1;
                comment = dto.comment;
                date = Time.now();
                author = commenterId;
                isAdmin = isCallerAdmin(commenterId);
            };

            supportQueries := Array.map(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : AppTypes.SupportQuery {
                    if (supportQuery.id == dto.supportQueryId) {
                        let updateSupportQuery : AppTypes.SupportQuery = {
                            id = supportQuery.id;
                            name = supportQuery.name;
                            message = supportQuery.message;
                            contact = supportQuery.contact;
                            status = supportQuery.status;
                            submittedBy = supportQuery.submittedBy;
                            submittedOn = supportQuery.submittedOn;
                            assignedTo = supportQuery.assignedTo;
                            app = supportQuery.app;
                            comments = Array.append(supportQuery.comments, [newComment]);
                        };
                        return updateSupportQuery;
                    };
                    return supportQuery;
                },
            );
            return #ok(());
        };

        public func removeSupportQuery(caller : Ids.PrincipalId, dto : SupportQueryCommands.RemoveSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            let ?supportQuery = Array.find(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : Bool {
                    return Nat.equal(supportQuery.id, dto.supportQueryId);
                },
            ) else {
                return #err(#NotFound);
            };

            if (isCallerAdmin(caller) or Text.equal(supportQuery.submittedBy, caller)) {
                supportQueries := Array.filter(
                    supportQueries,
                    func(supportQuery : AppTypes.SupportQuery) : Bool {
                        return Nat.notEqual(supportQuery.id, dto.supportQueryId);
                    },
                );
                return #ok(());
            } else {
                return #err(#NotAuthorized);
            };

        };

        public func updateSupportQueryStatus(dto : SupportQueryCommands.UpdateSupportQueryStatus) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = Array.find(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : Bool {
                    return Nat.equal(supportQuery.id, dto.supportQueryId);
                },
            ) else {
                return #err(#NotFound);
            };

            supportQueries := Array.map(
                supportQueries,
                func(supportQuery : AppTypes.SupportQuery) : AppTypes.SupportQuery {
                    if (Nat.equal(supportQuery.id, dto.supportQueryId)) {
                        let updatedSupportQuery : AppTypes.SupportQuery = {
                            id = supportQuery.id;
                            name = supportQuery.name;
                            message = supportQuery.message;
                            contact = supportQuery.contact;
                            status = dto.updatedStatus;
                            submittedBy = supportQuery.submittedBy;
                            submittedOn = supportQuery.submittedOn;
                            assignedTo = supportQuery.assignedTo;
                            app = supportQuery.app;
                            comments = supportQuery.comments;
                        };
                        return updatedSupportQuery;
                    };
                    return supportQuery;
                },
            );
            return #ok(());
        };

        private func validate(dto : SupportQueryCommands.CreateSupportQuery) : Result.Result<(), MopsEnums.Error> {
            let validName = Text.size(dto.name) < 25;
            let validMessage = Text.size(dto.message) < 500;
            let validContact = Text.size(dto.contact) < 50;

            if (validName and validMessage and validContact) {} else {
                return #err(#TooLong);
            };

            let ?_ = BaseUtilities.appToText(dto.app) else {
                return #err(#NotFound);
            };
            return #ok(());
        };

        private func isCallerAdmin(callerPrincipalId : Ids.PrincipalId) : Bool {
            let approvedCaller = Array.find<Ids.PrincipalId>(
                Environment.ADMIN_PRINCIPAL_IDS,
                func(principalId : Ids.PrincipalId) : Bool {
                    Text.equal(principalId, callerPrincipalId);
                },
            );

            return Option.isSome(approvedCaller);
        };

    };
};
