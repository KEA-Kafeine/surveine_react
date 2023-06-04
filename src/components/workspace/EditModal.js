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
    }, [])
    
    const tokenValue = useRecoilValue(uToken);

    const [folderName, setFolderName] = useState("");
    const [enqName, setEnqName] = useState("");
    const [moveFolder, setMoveFolder] = useState("");
    const [confirmRep, setConfirmRep] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [confirmShare, setConfirmShare] = useState(false);

    const setIsShared = props.setIsShared;
    const setEnqNameByRsp = props.setEnqName;

    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    };
    const handleEnqNameChange = (e) => {
        setEnqName(e.target.value);
    }
    const handleMoveFolder = (folderName) => {
        console.log("이동할 폴더: ", folderName);
        setMoveFolder(folderName);
    }
    const handleConfirmRep = (confRep) => {
        setConfirmRep(confRep);
        enqReplic(confRep);
    }
    const handleConfirmDel = (confDel) => {
        setConfirmDel(confDel);
        enqDelete(confDel);
    }
    const handleConfirmShare = (confShare) => {
        setConfirmShare(confShare);
        enqShare(confShare);
    }

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
        axios.put(`/api/wspace/enq/rename/${props.enqId}`, {"enqName": enqName}, {
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

    const saveMoveFolder = () => {
        // props.onSave(folderId);
        const selectedFolder = props.folderList.find((item) => item.cboxName === moveFolder);
        console.log(selectedFolder);
        console.log("id: ", selectedFolder.cboxId);
        
        // 폴더이동: cbox, abox 따로
        let url, reqData;
        if(selectedFolder.hasOwnProperty("cboxId")) {
            // url = `/api/wspace/enq/move/${selectedFolder.cboxId}`;
            url = `/api/wspace/enq/move/${props.enqId}`;
            reqData = {"cboxId": selectedFolder.cboxId};
        } else if(selectedFolder.hasOwnProperty("aboxId")) {
            // url = `/api/wspace/ans/move/${selectedFolder.aboxId}`;
            url = `/api/wspace/ans/move/${props.ansId}`;
            reqData = {"aboxId": selectedFolder.aboxId};
        }

        axios.put(url, reqData, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is moved: ", response.data);
        })
        .catch(error => {
            console.error("[ERROR] move folder: ", error);
            console.log(reqData);
        });

        props.onClose();
    }

    const enqReplic = (confRep) => {
        // props.onSave(confirmRep);
        console.log("confirmRep: ", confRep);
        console.log(confirmRep);

        // 커피콩 복제: cbox에서만 가능 (abox에 관한 것 따로 구현 X)
        axios.put(`/api/wspace/enq/replic/${props.enqId}`, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is replicated: ", response.data);
        })
        .catch(error => {
            console.log("[ERROR] replicate enquete: ", error);
        });

        props.onClose();
    }

    const enqDelete = (confDel) => {
        console.log("confirmDel: ", confDel);
        console.log(confirmDel);

        // TODO: cbox인지 abox인지 구분해야해 -> abox에서의 delete 구현 필요
        // 아래는 cbox에서의 delete만 해당 (abox에서의 delete은 다르게 구현)
        axios.delete(`/api/wspace/enq/delete/${props.enqId}`, {
            headers: { Authorization: "Bearer " + String(tokenValue) },
        })
        .then((response) => {
            console.log("Enquete is deleted: ", response.data);
        })
        .catch(error => {
            console.log("[ERROR] delete enquete: ", error);
        });
        
        props.onClose();
    }

    const enqShare = (confShare) => {
        console.log("confirmShare: ", confShare);
        console.log(confirmShare);

        axios.put(`/api/wspace/enq/share/${props.enqId}`, null, {
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
    }

    const closeModal = () => {
        props.onClose();
    }

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
                    <h2>이름 바꾸기</h2>
                    <InputWrapper
                        type="text"
                        placeholder="Enquete Name"
                        value={enqName}
                        onChange={handleEnqNameChange} />
                    {/* <SaveBtn style={{marginLeft: "230px", marginTop: "5px"}} onClick={modifyEnqName}>확인</SaveBtn> */}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "160px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn style={{marginLeft: "10px"}} onClick={modifyEnqName}>확인</SaveBtn>
                    </BtnWrapper>
                </div>
            )}
            {props.what === "moveFolder" && (
                <div>
                    <h2>폴더 이동</h2>
                    {[props.folderList[0], ...props.folderList.slice(1).sort((a, b) => a.cboxName.localeCompare(b.cboxName))]
                    .map((item) => (
                        <div
                            key={item.cboxId}
                            onClick={() => handleMoveFolder(item.cboxName)}
                            style={{fontWeight: moveFolder === item.cboxName ? "bold" : "normal", cursor: "pointer"}}
                        >
                            {item.cboxName}
                        </div>
                    ))}
                    <BtnWrapper>
                        <SaveBtn style={{marginLeft: "170px", border: 0}} onClick={closeModal}>취소</SaveBtn>
                        <SaveBtn onClick={saveMoveFolder}>이동</SaveBtn>
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