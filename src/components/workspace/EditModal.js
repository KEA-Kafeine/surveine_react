import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ximg from "../../img/sideNavi/xImg.svg";
import axios from "axios";
import { uToken } from "../TokenAtom";
import { useRecoilValue } from "recoil";

const EditModal = (props) => {
    useEffect(() => {
        console.log("===ENQ SET MODAL===");
        console.log(props);
        console.log("===END Modal===");
    }, []);
    
    const tokenValue = useRecoilValue(uToken);

    const [folderName, setFolderName] = useState("");
    const [enqName, setEnqName] = useState("");
    const [moveFolder, setMoveFolder] = useState("");
    const [confirmRep, setConfirmRep] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [confirmDelAns, setConfirmDelAns] = useState(false);
    const [confirmShare, setConfirmShare] = useState(false);
    const [confirmReport, setConfirmReport] = useState(false);
    const [bringCbox, setBringCbox] = useState("");
    const [modifyFName, setModifyFName] = useState("");
    const [delFolder, setDelFolder] = useState(false);
    const [confirmDist, setConfirmDist] = useState(false);
    const [respGPS, setRespGPS] = useState("");

    const setIsShared = props.setIsShared;
    const setEnqNameByRsp = props.setEnqName;

    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    };
    const handleEnqNameChange = (e) => {
        setEnqName(e.target.value);
    };
    const handleMoveFolder = (folderName) => {
        console.log("이동할 폴더: ", folderName);
        setMoveFolder(folderName);
    };
    const handleConfirmRep = (confRep) => {
        setConfirmRep(confRep);
        enqReplic(confRep);
    };
    const handleConfirmDel = (confDel) => {
        setConfirmDel(confDel);
        enqDelete(confDel);
    };
    const handleConfirmDelAns = (confDel) => {
        setConfirmDelAns(confDel);
        ansDelete(confDel);
    };
    const handleConfirmShare = (confShare) => {
        setConfirmShare(confShare);
        enqShare(confShare);
    };
    const handleConfirmReport = (confReport) => {
        setConfirmReport(confReport);
        enqReport(confReport);
    };
    const handleBringCbox = (folderName) => {
        console.log("가져올 폴더: ", folderName);
        setBringCbox(folderName);
    };
    const handleFNameModify = (e) => {
        setModifyFName(e.target.value);
    };
    const handleDelFolder = (confDelF) => {
        setDelFolder(confDelF);
        folderDelete(confDelF);
    };
    const handleStartDist = (confDist) => {
        setConfirmDist(confDist);
        startDist(confDist);
    };
    const handleEndDist = (confDist) => {
        setConfirmDist(confDist);
        endDist(confDist);
    };
    const handleRespGPS = (folderName) => {
        console.log("가져올 참여함 폴더: ", folderName);
        setRespGPS(folderName);
    };

    const saveFolderName = () => {
        props.onSave(folderName);
        console.log("folder name: " + folderName);

        // 폴더생성: cbox, abox 따로
        let url = "/api/wspace/cbox/new";
        if(props.type === "참여함") {
            url = "/api/wspace/abox/new";
        }

        axios.post(url, {[props.type === "제작함" ? "cboxName" : "aboxName"]: folderName}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Folder created: ", response.data);
        })
        .catch(error => {
            console.error("[ERROR] creating folder: ", error);
        });
        console.log("type: ", props.type);
        console.log(folderName);

        props.onClose();
    };

    const modifyEnqName = () => {
        props.onSave(enqName);
        console.log("enq name: " + enqName);

        // 커피콩 이름 변경: cbox에서만 가능 (abox에 관한 것 따로 구현 X)
        axios.put(`/api/enq/rename/${props.enqId}`, {"enqName": enqName}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("EnqName is modified: ", response.data);
            setEnqNameByRsp(response.data.result.enqName);
        })
        .catch(error => {
            console.error("[ERROR] modifying enquete name: ", error);
        });
        console.log(enqName);

        props.onClose();
    };

    // 제작함 폴더 이동
    const saveMoveFolder_cbox = () => {
        // props.onSave(folderId);
        const selectedFolder = props.folderList.find((item) => item.cboxName === moveFolder);
        console.log(selectedFolder);
        console.log("id: ", selectedFolder.cboxId);

        axios.put(`/api/enq/move/${props.enqId}`, {"cboxId": selectedFolder.cboxId}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is moved: ", response.data);
        })
        .catch(error => {
            console.error("[ERROR] move folder: ", error);
        });

        props.onClose();
    };

    // 참여함 폴더 이동
    const saveMoveFolder_abox = () => {
        const selectedFolder = props.folderList.find((item) => item.aboxName === moveFolder);
        console.log(selectedFolder);
        console.log("id: ", selectedFolder.aboxId);

        axios.put(`/api/wspace/ans/move/${props.ansId}`, {"aboxId": selectedFolder.aboxId}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is moved: ", response.data);
        })
        .catch(error => {
            console.error("[ERROR] move folder: ", error);
        });

        props.onClose();
    };

    const enqReplic = (confRep) => {
        // props.onSave(confirmRep);
        console.log("confirmRep: ", confRep);
        console.log(confirmRep);

        // 커피콩 복제: cbox에서만 가능 (abox에 관한 것 따로 구현 X)
        axios.put(`/api/enq/replic/${props.enqId}`, null, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is replicated: ", response.data);
        })
        .catch(error => {
            console.log("[ERROR] replicate enquete: ", error);
        });

        props.onClose();
    };

    const enqDelete = (confDel) => {
        console.log("confirmDel: ", confDel);
        console.log(confirmDel);

        // TODO: cbox인지 abox인지 구분해야해 -> abox에서의 delete 구현 필요
        // 아래는 cbox에서의 delete만 해당 (abox에서의 delete은 다르게 구현)
        // /api/enq/{enqId}
        axios.delete(`/api/enq/${props.enqId}`, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is deleted: ", response.data);
        })
        .catch(error => {
            console.log("[ERROR] delete enquete: ", error);
        });
        
        props.onClose();
    };
    const ansDelete = (confDel) => {
        console.log("confirmDelAns: ", confDel);
        console.log(confirmDelAns);

        axios.put(`/api/wspace/ans/delete/${props.ansId}`, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Answer is deleted: ", response.data);
            } else {
                alert("faild to");
            }
        })
        .catch(error => {
            console.log("[ERROR] delete answer: ", error);
        });

        props.onClose();
    };

    const enqShare = (confShare) => {
        console.log("confirmShare: ", confShare);
        console.log(confirmShare);

        // 커피콩 공유여부: cbox에서만 가능 (abox에 관한 것 따로 구현 X)
        axios.put(`/api/enq/share/${props.enqId}`, null, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Change enqShare status: ", response.data);
            setIsShared(response.data.result.isShared);
        })
        .catch(error => {
            console.log("[ERROR] change enqShare status: ", error);
        });

        props.onClose();
    };

    const enqReport = (confReport) => {
        console.log("confirmReport: ", confReport);
        console.log(confirmReport);

        axios.post("/api/sbox/report", {"enqId": props.enqId}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Template is reported: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.log("[ERROR] report template: ", error);
        });

        props.onClose();
    };

    const bring_to_cbox = () => {
        const selectedFolder = props.folderList.find((item) => item.cboxName === bringCbox);
        console.log(selectedFolder);
        console.log("id: ", selectedFolder.cboxId);

        axios.post("/api/sbox/bring", {"cboxId": selectedFolder.cboxId, "enqId": props.enqId}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Bring template to my cbox: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.log("[ERROR] bring tempalte: ", error);
        });

        props.onClose();
    };

    // 폴더 이름 변경
    const saveModifyFName = () => {
        props.onSave(modifyFName);
        console.log("modify folder name: " + modifyFName);
        
        let url = `/api/wspace/cbox/rename/${props.boxId}`;
        if(props.type === "abox") {
            url = `/api/wspace/abox/rename/${props.boxId}`;
        }
        axios.put(url, {[props.type === "cbox" ? "cboxName" : "aboxName"]: modifyFName}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Modify folder name: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.error("[ERROR] modify folder name: ", error);
        });
    
        props.onClose();
    };

    const folderDelete = (confDelF) => {
        console.log("confirm delete folder: ", confDelF);
        
        let url = `/api/wspace/cbox/delete/${props.boxId}`;
        if(props.type === "abox") {
            url = `/api/wspace/abox/delete/${props.boxId}`;
        }
        
        axios.delete(url, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Delete folder: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.error("[ERROR] delete folder: ", error);
        });

        props.onClose();
    };

    const startDist = (confDist) => {
        console.log("confirm distribute: ", confDist);
        axios.put("/api/wspace/dist", {"enqId": props.enqId, "enqStatus": "DIST_DONE"}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Start distribute: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.error("[ERROR] start distribute: ", error);
        });

        props.onClose();
    };
    const endDist = (confDist) => {
        console.log("confirm distribute: ", confDist);
        axios.put("/api/wspace/dist", {"enqId": props.enqId, "enqStatus": "ENQ_DONE"}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("End distribute: ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.error("[ERROR] end distribute: ", error);
        });

        props.onClose();
    };

    const respGPS_abox = () => {
        const selectedFolder = props.folderList.find((item) => item.aboxName === respGPS);
        console.log(selectedFolder);
        console.log("id: ", selectedFolder.aboxId);
        
        // /api/ans/gps/resp
        axios.post("/api/ans/gps/resp", {"enqId": props.enqId, "aboxId": selectedFolder.aboxId}, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            if(response.data.isSuccess) {
                console.log("Response GPS enquete (bring it to abox): ", response.data);
            } else {
                alert("failed to");
            }
        })
        .catch(error => {
            console.error("[ERROR] response GPS enquete: ", error);
        });

        props.onClose();
    };
    
    const closeModal = () => {
        props.onClose();
    };

    return(
        <Wrapper>
            <XImg src={Ximg} onClick={closeModal} />
            {props.what === "newFolder" && (
                <div>
                    <h2>Create Folder</h2>
                    <InputWrapper
                        type="text"
                        placeholder="Folder Name"
                        value={folderName}
                        onChange={handleFolderNameChange} />
                    {/* <SaveBtn style={{marginLeft: "230px", marginTop: "5px"}} onClick={saveFolderName}>확인</SaveBtn> */}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "160px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{marginLeft: "10px"}} onClick={saveFolderName}>확인</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "modifyEnqName" && (
                <div>
                    <h2>설문지 이름 변경</h2>
                    <InputWrapper
                        type="text"
                        placeholder={props.enqName}
                        value={enqName}
                        onChange={handleEnqNameChange} />
                    {/* <SaveBtn style={{marginLeft: "230px", marginTop: "5px"}} onClick={modifyEnqName}>확인</SaveBtn> */}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "160px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{marginLeft: "10px"}} onClick={modifyEnqName}>확인</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "moveFolder_cbox" && (
                <div>
                    <h2>폴더 이동</h2>
                    {(
                        [props.folderList[0], ...props.folderList.slice(1).sort((a, b) => a.cboxName.localeCompare(b.cboxName))]
                        .map((item) => (
                            <div
                                key={item.cboxId}
                                onClick={() => handleMoveFolder(item.cboxName)}
                                style={{fontWeight: moveFolder === item.cboxName ? "bold" : "normal", cursor: "pointer"}}
                            >
                                {item.cboxName}
                            </div>
                        ))
                    )}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "170px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn onClick={saveMoveFolder_cbox}>이동</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "moveFolder_abox" && (
                <div>
                    <h2>폴더 이동</h2>
                    {(
                        [props.folderList[0], ...props.folderList.slice(1).sort((a, b) => a.aboxName.localeCompare(b.aboxName))]
                        .map((item) => (
                            <div
                                key={item.aboxId}
                                onClick={() => handleMoveFolder(item.aboxName)}
                                style={{fontWeight: moveFolder === item.aboxName ? "bold" : "normal", cursor: "pointer"}}
                            >
                                {item.aboxName}
                            </div>
                        ))
                    )}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "170px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn onClick={saveMoveFolder_abox}>이동</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "replicateEnq" && (
                <CenteredDiv>
                    <h3>"{props.enqName}"을 <br/><br/>복제하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleConfirmRep(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "deleteEnq" && (
                <CenteredDiv>
                    <h3>"{props.enqName}"을 <br/><br/>삭제하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleConfirmDel(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "deleteAns" && (
                <CenteredDiv>
                    <h3>"{props.enqName}"을 <br/><br/>삭제하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleConfirmDelAns(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "shareEnq" && (
                <CenteredDiv>
                    {props.isShared === false && (
                        <h3>"{props.enqName}"을 <br/><br/>SandBox에 공유하시겠습니까?</h3>
                    )}
                    {props.isShared === true && (
                        <h3>"{props.enqName}"을 <br/><br/>SandBox에서 공유취소하시겠습니까?</h3>
                    )}
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleConfirmShare(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "reportEnq" && (
                <CenteredDiv>
                    <h3>"{props.enqName}"을 <br/><br/>신고하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleConfirmReport(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "bringToCbox" && (
                <div>
                    <h2>"{props.enqName}"을 <br/>내 제작함으로 가져오기</h2>
                    {(
                        [props.folderList[0], ...props.folderList.slice(1).sort((a, b) => a.cboxName.localeCompare(b.cboxName))]
                        .map((item) => (
                            <div
                                key={item.cboxId}
                                onClick={() => handleBringCbox(item.cboxName)}
                                style={{fontWeight: bringCbox === item.cboxName ? "bold" : "normal", cursor: "pointer"}}
                            >
                                {item.cboxName}
                            </div>
                        ))
                    )}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "8.5rem", border: 0, width: "4rem"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{width: "5.5rem", marginRight: "0.2rem"}} onClick={bring_to_cbox}>가져오기</SaveBtn>
                    </BtnWrapper>
                </div>
            )}

            {props.what === "modifyFolderName" && (
                <div>
                    <h2>폴더 이름 변경</h2>
                    <InputWrapper
                        type="text"
                        placeholder={props.boxName}
                        value={modifyFName}
                        onChange={handleFNameModify}
                    />
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "160px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{marginLeft: "10px"}} onClick={saveModifyFName}>확인</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "deleteFolder" && (
                <CenteredDiv>
                    <h3>"{props.boxName}" 폴더를<br/><br/>삭제하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleDelFolder(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}

            {props.what === "startDistribute" && (
                <CenteredDiv>
                    <h3>"{props.enqName}" 설문지를<br/><br/>지금 바로 배포시작 하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleStartDist(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}
            {props.what === "endDistribute" && (
                <CenteredDiv>
                    <h3>"{props.enqName}" 설문지를<br/><br/>지금 바로 배포종료 하시겠습니까?</h3>
                    <BtnWrapper>
                        <SaveBtn className="cancel" style={{marginRight: "15px", cursor: "pointer"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtnNoHover onClick={() => handleEndDist(true)}>확인</SaveBtnNoHover>
                    </BtnWrapper>
                </CenteredDiv>
            )}

            {props.what === "responseGPS" && (
                <div>
                    <h2>"{props.enqName}"을 <br/>내 참여함으로 가져오기</h2>
                    {(
                        [props.folderList[0], ...props.folderList.slice(1).sort((a, b) => a.aboxName.localeCompare(b.aboxName))]
                        .map((item) => (
                            <div
                                key={item.aboxId}
                                onClick={() => handleRespGPS(item.aboxName)}
                                style={{fontWeight: respGPS === item.aboxName ? "bold" : "normal", cursor: "pointer"}}
                            >
                                {item.aboxName}
                            </div>
                        ))
                    )}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "8.5rem", border: 0, width: "4rem"}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{width: "5.5rem", marginRight: "0.2rem"}} onClick={respGPS_abox}>가져오기</SaveBtn>
                    </BtnWrapper>
                </div>
            )}

        </Wrapper>
    );
};
export default EditModal;

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    width: 300px;
    padding: 20px;
    z-index: 3;
    color: #1A2051;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

const XImg = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const InputWrapper = styled.input`
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1.5px solid #1A2051;
    border-radius: 5px;
`;

const SaveBtn = styled.button`
    padding: 7px 18px;
    margin-top: 10px;
    margin-left: auto;
    background-color: #FFFFFF;
    border: 1.5px solid #1A2051;
    border-radius: 35px;
    color: #1A2051;
    font-weight: 550;

    &:hover:not(.cancel) {
        background-color: #1A2051;
        color: #FFFFFF;
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const SaveBtnNoHover = styled.button`
    padding: 7px 18px;
    margin-top: 10px;
    margin-left: auto;
    background-color: #1A2051;
    border: 1.5px solid #1A2051;
    border-radius: 35px;
    color: #FFFFFF;
    font-weight: 550;
    cursor: pointer;
`;