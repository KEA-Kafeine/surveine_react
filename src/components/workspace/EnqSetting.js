import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { uToken } from "../TokenAtom";
import CoffeeBeanList from "./CoffeeBeanList";
import EditModal from "./EditModal";

function EnqSetModal(props) {
    const modalRef = useRef();
    const handleClickOutside = (event) => {
        if(modalRef.current && !modalRef.current.contains(event.target)) {
            props.onClose();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("===ENQ SETTING===");
        console.log(props);
        console.log("===END Setting===");
    }, [])

    const tokenValue = useRecoilValue(uToken);

    // 커피콩 점3개: 커피콩 복제
    const [showReplicModal, setShowReplicModal] = useState(false);
    const [confirmReplic, setConfirmReplic] = useState(false);
    const clickRepc = () => {
        setShowReplicModal(true);
    };
    const handleConfirmReplic = (confRep) => {
        setConfirmReplic(confRep);
        setShowReplicModal(false);
    };

    // 커피콩 점3개: 커피콩 삭제
    const [showDelModal, setShowDelModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const clickDel = () => {
        setShowDelModal(true);
    };
    const handleConfirmDelete = (confDel) => {
        setConfirmDelete(confDel);
        setShowDelModal(false);
    };
    
    // 커피콩 점3개: 커피콩 공유여부
    const [showShareModal, setShowShareModal] = useState(false);
    const [confirmShare, setConfirmShare] = useState(false);
    const clickShare = () => {
        setShowShareModal(true);
    };
    const handleConfirmShare = (confShare) => {
        setConfirmShare(confShare);
        setShowShareModal(false);
    };
    const[isSharedState, setIsSharedState] = useState(props.isShared);

    // 커피콩 점3개: 커피콩 이름변경
    const [showNewNameEditModal, setShowNewNameEditModal] = useState(false);
    const [newEnqName, setNewEnqName] = useState("");
    const clickMod = () => {
        setShowNewNameEditModal(true);    
    };
    const handleNewEnqNameSave = (EnqName) => {
        setNewEnqName(EnqName);
        setShowNewNameEditModal(false);
    };
    
    const setEnqName = props.setEnqName;

    // 커피콩 점3개: 커피콩 폴더이동
    const [showMoveFolderEditModal, setShowMoveFolderEditModal] = useState(false);
    const [moveFolder, setMoveFolder] = useState(0);
    const clickMove = () => {
        setShowMoveFolderEditModal(true);
    };
    const handleMoveFolder = (mFolderId) => {
        setMoveFolder(mFolderId);
        setShowMoveFolderEditModal(false);
    };

    // 샌드박스 템플릿 내제작함으로 가져오기
    const [showBringModal, setShowBringModal] = useState(false);
    const [bring, setBring] = useState(0);
    const clickBring = () => {
        setShowBringModal(true);
    };
    const handleBring = (folderId) => {
        setBring(folderId);
        setShowBringModal(false);
    };
 
    // 샌드박스 템플릿 신고
    const [showReportModal, setShowReportModal] = useState(false);
    const [confirmReport, setConfirmReport] = useState(false);
    const clickReport = () => {
        setShowReportModal(true);
    };
    const handleConfirmReport = (confReport) => {
        setConfirmReport(confReport);
        setShowReportModal(false);
    };

    return (
        <Wrapper className="modal" ref={modalRef}>
            {props.type === "cbox" && (
                <div>
                    <SetOption onClick={clickRepc}>복제</SetOption>
                    {showReplicModal && (
                        <EditModal onClose={() => setShowReplicModal(false)} onSave={handleConfirmReplic} enqId={props.enqId} enqName={props.enqName} what="replicateEnq" />
                    )}
                </div>
            )}

            {props.type === "cbox" && (
                <div>
                    <SetOption onClick={clickMod}>이름변경</SetOption>
                    {showNewNameEditModal && (
                        <EditModal onClose={() => setShowNewNameEditModal(false)} onSave={handleNewEnqNameSave} enqId={props.enqId} enqName={props.enqName} setEnqName={setEnqName} what="modifyEnqName" />
                    )}
                </div>
            )}

            {props.type !== "sbox" && (
                <div>
                    <SetOption onClick={clickMove}>폴더이동</SetOption>
                    {props.abList === undefined && showMoveFolderEditModal && (
                        <EditModal
                            onClose={() => setShowMoveFolderEditModal(false)}
                            onSave={handleMoveFolder}
                            enqId={props.enqId}
                            folderList={props.cbList}
                            what="moveFolder_cbox" />
                    )}
                    {props.cbList === undefined && showMoveFolderEditModal && (
                        <EditModal
                            onClose={() => setShowMoveFolderEditModal(false)}
                            onSave={handleMoveFolder}
                            ansId={props.ansId}
                            folderList={props.abList}
                            what="moveFolder_abox"
                        />
                    )}
                </div>
            )}
            
            {props.type === "cbox" && (
                <div>
                    <SetOption onClick={() => {clickDel(props.enqId)}}>삭제</SetOption>
                    {showDelModal && (
                        <EditModal onClose={() => setShowDelModal(false)} onSave={handleConfirmDelete} enqId={props.enqId} enqName={props.enqName} what="deleteEnq" />
                    )}
                </div>
            )}
            {props.type === "abox" && (
                <div>
                    <SetOption onClick={() => {clickDel(props.ansId)}}>삭제</SetOption>
                    {showDelModal && (
                        <EditModal onClose={() => setShowDelModal(false)} onSave={handleConfirmDelete} ansId={props.ansId} enqName={props.enqName} what="deleteAns" />
                    )}
                </div>
            )}

            {props.type === "cbox" && isSharedState == false && (
                <div>
                    <SetOption onClick={() => {clickShare(props.enqId)}}>공유하기</SetOption>
                    {showShareModal && (
                        <EditModal onClose={() => setShowShareModal(false)} onSave={handleConfirmShare} enqId={props.enqId} enqName={props.enqName} isShared={isSharedState} setIsShared={setIsSharedState} what="shareEnq" />
                    )}
                </div>
            )}
            {props.type === "cbox" && isSharedState == true && (
                <div>
                    <SetOption onClick={() => {clickShare(props.enqId)}}>공유취소</SetOption>
                    {showShareModal && (
                        <EditModal onClose={() => setShowShareModal(false)} onSave={handleConfirmShare} enqId={props.enqId} enqName={props.enqName} isShared={isSharedState} setIsShared={setIsSharedState} what="shareEnq" />
                    )}
                </div>
            )}

            {props.type === "sbox" && (
                <div>
                    <SetOption onClick={clickBring}>가져오기</SetOption>
                    {showBringModal && (
                        <EditModal
                            onClose={() => setShowBringModal(false)}
                            onSave={handleBring}
                            enqId={props.enqId}
                            enqName={props.enqName}
                            folderList={props.cbList}
                            what="bringToCbox"
                        />
                    )}
                </div>
            )}
            {props.type === "sbox" && (
                <div>
                    <SetOption onClick={() => {clickReport(props.enqId)}}>신고</SetOption>
                    {showReportModal && (
                        <EditModal onClose={() => setShowReportModal(false)} onSave={handleConfirmReport} enqId={props.enqId} enqName={props.enqName} what="reportEnq" />
                    )}
                </div>
            )}

        </Wrapper>
    );
}
export default EnqSetModal;

const Wrapper = styled.div`
    position: absolute;
    bottom: -80px;
    right: -45px;
    background-color: #F8F8F8;
    color: black;
    border: 1px solid #000000;
    border-radius: 10px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
`;

const SetOption = styled.button`
    margin: 0.2rem;
    text-align: center;
    font-size: 13px;
    border: none;
    background-color: #F8F8F8;
`;