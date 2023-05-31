//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "./AutomateTaskCreator.sol";

error Unauthorized();

contract Trial is AutomateTaskCreator {
    constructor(
        address _automate,
        address _fundsOwner
    ) AutomateTaskCreator(_automate, _fundsOwner) {}

    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;

    bytes32 public taskId;
    bytes32 public taskId1;
    bytes32 public taskId2;

    event CounterTaskCreated(bytes32 taskId);

    struct StreamDetails {
        address user;
        address receiver;
        ISuperToken token;
        uint startTime;
        uint endTime;
        int96 startFlowRate;
        int96 flowRate;
        uint[] updateTime;
        int96[] updateFlowRate;
        bool[] isFlowUpdated;
        bool isStarted;
        bool isUpadetd;
        bool isDeleted;
        bool isScheduled;
    }
    mapping(address => StreamDetails[]) public userStreams;
    address[] users;
    mapping(address => bool) public isUserAdded;

    function scheduleStream(StreamDetails memory data) public {
        if (data.isScheduled) {
            require(
                data.startTime < data.endTime,
                "Start time should be less than the end time"
            );
            if (!data.isUpadetd) {
                for (uint j = 0; j < data.updateTime.length - 1; j++) {
                    require(
                        data.updateTime[j] > data.startTime &&
                            data.updateTime[j] < data.endTime &&
                            data.updateTime[j] < data.updateTime[j + 1],
                        "Enetr proper timestamp"
                    );
                }
            }
        }

        userStreams[msg.sender].push(data);

        if (isUserAdded[msg.sender] == false) {
            users.push(msg.sender);
            isUserAdded[msg.sender] = true;
        }
    }

    function editUserStreams(uint i, StreamDetails memory data) public {
        if (data.isScheduled) {
            require(
                data.startTime < data.endTime,
                "Start time should be less than the end time"
            );
            if (!data.isUpadetd) {
                for (uint j = 0; j < data.updateTime.length - 1; j++) {
                    require(
                        data.updateTime[j] > data.startTime &&
                            data.updateTime[j] < data.endTime &&
                            data.updateTime[j] < data.updateTime[j + 1],
                        "Enetr proper timestamp"
                    );
                }
            }
            userStreams[msg.sender][i] = data;
        }
    }

    function getAllUserStreams(
        address _user
    ) public view returns (StreamDetails[] memory) {
        return userStreams[_user];
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function createFlowIntoContract(
        address _sender,
        uint j
    ) external onlyDedicatedMsgSender {
        userStreams[_sender][j].isStarted = true;
        ISuperToken spreaderToken = userStreams[_sender][j].token;
        spreaderToken.createFlowFrom(
            _sender,
            userStreams[_sender][j].receiver,
            userStreams[_sender][j].startFlowRate
        );
    }

    function deleteFlowIntoContract(
        address _sender,
        uint j
    ) external onlyDedicatedMsgSender {
        userStreams[_sender][j].isDeleted = true;
        ISuperToken spreaderToken = userStreams[_sender][j].token;
        spreaderToken.deleteFlow(_sender, userStreams[_sender][j].receiver);
    }

    function updateFlowIntoContract(
        address _sender,
        uint j,
        uint k
    ) external onlyDedicatedMsgSender {
        userStreams[_sender][j].isFlowUpdated[k] = true;
        userStreams[_sender][j].flowRate = userStreams[_sender][j]
            .updateFlowRate[k];
        // if (k == (userStreams[_sender][j].updateTime.length) - 1) {
        //     userStreams[_sender][j].isUpadetd = true;
        // }
        ISuperToken spreaderToken = userStreams[_sender][j].token;
        spreaderToken.updateFlowFrom(
            _sender,
            userStreams[_sender][j].receiver,
            userStreams[_sender][j].flowRate
        );
    }

    // function unscheduledUpdate(int96 _flow, uint j) public {
    //     // userStreams[msg.sender][j].flowRate = _flow;
    //     userStreams[msg.sender][j].updateFlowRate.push(_flow);
    //     userStreams[msg.sender][j].updateTime.push(block.timestamp);
    //     userStreams[msg.sender][j].isFlowUpdated.push(false);
    // }

    // function unscheduledDelete(uint j) public {
    //     userStreams[msg.sender][j].endTime = block.timestamp;
    // }

    function createTask() external {
        require(taskId == bytes32(""), "Already started task");

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _resolverModuleArg(
            address(this),
            abi.encodeCall(this.checker, ())
        );
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(this),
            abi.encode(this.createFlowIntoContract.selector),
            moduleData,
            address(0)
        );

        taskId = id;
        emit CounterTaskCreated(id);
    }

    function createTask1() external {
        require(taskId1 == bytes32(""), "Already started task");

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _resolverModuleArg(
            address(this),
            abi.encodeCall(this.checker1, ())
        );
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(this),
            abi.encode(this.deleteFlowIntoContract.selector),
            moduleData,
            address(0)
        );

        taskId1 = id;
        emit CounterTaskCreated(id);
    }

    function createTask2() external {
        require(taskId2 == bytes32(""), "Already started task");

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _resolverModuleArg(
            address(this),
            abi.encodeCall(this.checker2, ())
        );
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(this),
            abi.encode(this.updateFlowIntoContract.selector),
            moduleData,
            address(0)
        );

        taskId2 = id;
        emit CounterTaskCreated(id);
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        for (uint i = 0; i < users.length; i++) {
            for (uint j = 0; j < userStreams[users[i]].length; j++) {
                if (userStreams[users[i]][j].isDeleted == false) {
                    if (userStreams[users[i]][j].isStarted == false) {
                        canExec =
                            block.timestamp >
                            (userStreams[users[i]][j].startTime);
                        // call create flow function
                        execPayload = abi.encodeWithSelector(
                            this.createFlowIntoContract.selector,
                            userStreams[users[i]][j].user,
                            j
                        );
                        if (canExec) {
                            return (true, execPayload);
                        } else {
                            return (
                                false,
                                bytes("Some time is left to start the stream")
                            );
                        }
                    }
                }
            }
        }
    }

    function checker1()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        for (uint i = 0; i < users.length; i++) {
            for (uint j = 0; j < userStreams[users[i]].length; j++) {
                if (userStreams[users[i]][j].isDeleted == false) {
                    if (userStreams[users[i]][j].endTime > 0) {
                        canExec =
                            block.timestamp > userStreams[users[i]][j].endTime;
                        // call delete flow function
                        execPayload = abi.encodeWithSelector(
                            this.deleteFlowIntoContract.selector,
                            userStreams[users[i]][j].user,
                            j
                        );
                        if (canExec) {
                            return (true, execPayload);
                        } else {
                            return (
                                false,
                                bytes("Some time left to end the stream")
                            );
                        }
                    }
                }
            }
        }
    }

    function checker2()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        for (uint i = 0; i < users.length; i++) {
            for (uint j = 0; j < userStreams[users[i]].length; j++) {
                if (userStreams[users[i]][j].isDeleted == false) {
                    // if (userStreams[users[i]][j].isUpadetd == false) {
                    for (
                        uint k = 0;
                        k < userStreams[users[i]][j].updateTime.length;
                        k++
                    ) {
                        if (
                            userStreams[users[i]][j].isFlowUpdated[k] == false
                        ) {
                            canExec =
                                block.timestamp >
                                userStreams[users[i]][j].updateTime[k];
                            // call update flow function
                            execPayload = abi.encodeWithSelector(
                                this.updateFlowIntoContract.selector,
                                userStreams[users[i]][j].user,
                                j,
                                k
                            );
                            if (canExec) {
                                return (true, execPayload);
                            } else {
                                return (
                                    false,
                                    bytes("Some time left to update the stream")
                                );
                            }
                        }
                    }
                    // }
                }
            }
        }
    }

    function depositForCounter() external payable {
        _depositFunds(msg.value, ETH);
    }
}
