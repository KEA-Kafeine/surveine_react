import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { uToken } from "../TokenAtom";
import CoffeeBeanList from "./CoffeeBeanList";
import EditModal from "./EditModal";
import { Edit } from "@mui/icons-material";

function EnqSetModal(props) {
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
    }

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
    }
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
    }
    
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
    }

    return (
        <Wrapper>
            <div>
                <SetOption onClick={clickRepc}>복제</SetOption>
                {showReplicModal && (
                    <EditModal onClose={() => setShowReplicModal(false)} onSave={handleConfirmReplic} enqId={props.enqId} enqName={props.enqName} what="replicateEnq" />
                )}
            </div>

            <div>
                <SetOption onClick={clickMod}>이름변경</SetOption>
                {showNewNameEditModal && (
                    <EditModal onClose={() => setShowNewNameEditModal(false)} onSave={handleNewEnqNameSave} enqId={props.enqId} setEnqName={setEnqName} what="modifyEnqName" />
                )}
            </div>
            
            <div>
                <SetOption onClick={clickMove}>폴더이동</SetOption>
                {showMoveFolderEditModal && (
                    <EditModal
                        onClose={() => setShowMoveFolderEditModal(false)}
                        onSave={handleMoveFolder}
                        enqId={props.enqId}
                        // {...(props.cbList && !props.abList ? {cbList: props.cbList} : {})}
                        // {...(!props.cbList && props.abList ? {abList: props.abList} : {})}
                        folderList={props.cbList ?? props.abList}
                        what="moveFolder" />
                )}
            </div>

            <div>
                <SetOption onClick={() => {clickDel(props.enqId)}}>삭제</SetOption>
                {showDelModal && (
                    <EditModal onClose={() => setShowDelModal(false)} onSave={handleConfirmDelete} enqId={props.enqId} enqName={props.enqName} what="deleteEnq" />
                )}
            </div>

            {isSharedState == false && (
                <div>
                    <SetOption onClick={() => {clickShare(props.enqId)}}>공유하기</SetOption>
                    {showShareModal && (
                        <EditModal onClose={() => setShowShareModal(false)} onSave={handleConfirmShare} enqId={props.enqId} enqName={props.enqName} isShared={isSharedState} setIsShared={setIsSharedState} what="shareEnq" />
                    )}
                </div>
            )}
            {isSharedState == true && (
                <div>
                    <SetOption onClick={() => {clickShare(props.enqId)}}>공유취소</SetOption>
                    {showShareModal && (
                        <EditModal onClose={() => setShowShareModal(false)} onSave={handleConfirmShare} enqId={props.enqId} enqName={props.enqName} isShared={isSharedState} setIsShared={setIsSharedState} what="shareEnq" />
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