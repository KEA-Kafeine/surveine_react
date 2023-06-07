import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Axios from "axios";
import CoffeeBeanIcon from "../../img/workspace/coffeeBean.svg";
import EnqSetIcon from "../../img/workspace/enqSetting.svg";
import GPSIcon from "../../img/workspace/GPS_icon.svg";
import LINKIcon from "../../img/workspace/LINK_icon.svg";
import EnqSetModal from "./EnqSetting";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { uToken } from "../TokenAtom";
import { useRecoilValue } from "recoil";
import EditModal from "./EditModal";
import LinkCopyModal from "./LinkCopyModal";

const CoffeeBean = (props) => {
  const tokenValue = useRecoilValue(uToken);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    console.log("===CoffeeBean===");
    console.log(props);
    console.log("===END CB===");
  }, []);
  const clickEnqSetting = () => {
    //검색을 클릭했을 때 실행되야할 기능 구현
    alert("설문지 설정 클릭");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  const unShowModal = () => {
    setModalOpen(false);
  };

  const showLinkModal = () => {
    setShowLink(!showLink);
  };
  const [showDistModal, setShowDistModal] = useState(false);
  const [confirmDist, setConfirmDist] = useState(false);
  const clickDistribute = () => {
    setShowDistModal(true);
  };
  const handleConfirmDist = (confDist) => {
    setConfirmDist(confDist);
    setShowDistModal(false);
  };

  const clickFav = (cbId) => {
    console.log(cbId + " 좋아요");
    axios
      .put(
        "/api/sbox/fav",
        { enqId: cbId },
        {
          headers: { Authorization: "Bearer " + String(tokenValue) },
        }
      )
      .then((response) => {
        if (response.data.isSuccess) {
          console.log("Change favorite status: ", response.data);
        } else {
          alert("failed to");
        }
      })
      .catch((error) => {
        console.log("[ERROR] change favorite status: ", error);
      });
  };

  const [showGPSRespModal, setShowGPSRespModal] = useState(false);
  const [respGPS, setRespGPS] = useState(0);
  const clickGPSResponse = () => {
    // alert("click GPS response");
    setShowGPSRespModal(true);
  };
  const handleRespGPS = (folderId) => {
    setRespGPS(folderId);
    setShowGPSRespModal(false);
  };

  const [enqName, setEnqName] = useState(props.cbName);

  return (
    <CoffeeBox>
      <div>
        {/* 제작함 커피콩 상태 관련 */}
        {props.type === "cbox" && props.cbStatus === "ENQ_MAKE" && (
          <EnqState>제작중</EnqState>
        )}
        {props.type === "cbox" && props.cbStatus === "DIST_WAIT" && (
          <EnqState>배포예약</EnqState>
        )}
        {props.type === "cbox" && props.cbStatus === "DIST_DONE" && (
          <EnqState>배포완료</EnqState>
        )}
        {props.type === "cbox" && props.cbStatus === "ENQ_DONE" && (
          <EnqState>설문종료</EnqState>
        )}

        {/* 참여함 커피콩 상태 관련 */}
        {props.type !== "sbox" && props.cbStatus === "SAVE" && (
          <EnqState>입력중</EnqState>
        )}
        {props.type !== "sbox" && props.cbStatus === "SUBMIT" && (
          <EnqState>제출완료</EnqState>
        )}

        {/* GPS 설문함 커피콩 상태 */}
        {props.type === "gbox" && props.cbStatus === "WAIT" && (
          <EnqState>대기중</EnqState>
        )}

        <CBIcon src={CoffeeBeanIcon} />

        <EnqPreview>
          {props.cbName.length > 10
            ? props.cbName.slice(0, 10) + "..."
            : props.cbName}
          <br />

          {props.type !== "sbox" && (
            <p style={{ fontSize: "12px", fontWeight: "250" }}>
              {props.updateDate}
            </p>
          )}

          {props.type === "sbox" && props.fav === false && (
            <FavCnt>
              <HeartOutlined
                style={{
                  marginRight: "0.3rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.9rem",
                }}
                onClick={() => clickFav(props.cbId)}
              />
              <p
                style={{
                  marginRight: "0.3rem",
                  marginTop: "0.35rem",
                  marginBottom: "0.7rem",
                }}
              >
                {props.favCount}
              </p>
            </FavCnt>
          )}
          {props.type === "sbox" && props.fav === true && (
            <FavCnt>
              <HeartFilled
                style={{
                  marginRight: "0.3rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.9rem",
                }}
                onClick={() => clickFav(props.cbId)}
              />
              <p
                style={{
                  marginRight: "0.3rem",
                  marginTop: "0.35rem",
                  marginBottom: "0.7rem",
                }}
              >
                {props.favCount}
              </p>
            </FavCnt>
          )}
        </EnqPreview>
      </div>

      {props.type === "gbox" && (
        <DistanceInfo>{props.distance}</DistanceInfo>
      )}

      {props.type !== "sbox" &&
        props.type !== "gbox" &&
        props.distType == "GPS" && <GPSType src={GPSIcon} />}
      {props.type === "gbox" && (
        <GPSType
          style={{ left: "224px", width: "1.1rem", height: "1.1rem" }}
          src={GPSIcon}
        />
      )}
      {props.type !== "sbox" && props.distType == "LINK" && (
        <LINKType src={LINKIcon} onClick={showLinkModal} />
      )}

      {/* 제작함에서만 보이는 버튼 */}
      {props.type === "cbox" && props.cbStatus == "DIST_WAIT" && (
        <div>
          <DistrBtn onClick={clickDistribute}>배포시작</DistrBtn>
          {showDistModal && (
            <EditModal
              onClose={() => setShowDistModal(false)}
              onSave={handleConfirmDist}
              enqId={props.cbId}
              enqName={props.cbName}
              what="startDistribute"
            />
          )}
        </div>
      )}
      {props.type === "cbox" && props.cbStatus == "DIST_DONE" && (
        <div>
          <DistrBtn onClick={clickDistribute}>배포종료</DistrBtn>
          {showDistModal && (
            <EditModal
              onClose={() => setShowDistModal(false)}
              onSave={handleConfirmDist}
              enqId={props.cbId}
              enqName={props.cbName}
              what="endDistribute"
            />
          )}
        </div>
      )}

      {/* GPS 설문함에서만 보이는 버튼 */}
      {props.type === "gbox" && props.cbStatus === "WAIT" && (
        <div>
          <DistrBtn onClick={clickGPSResponse}>설문참여</DistrBtn>
          {showGPSRespModal && (
            <EditModal
              onClose={() => setShowGPSRespModal(false)}
              onSave={handleRespGPS}
              enqId={props.cbId}
              enqName={props.cbName}
              folderList={props.abList}
              what="responseGPS"
            />
          )}
        </div>
      )}

      {props.type !== "gbox" && (
        <StyledEnqSetBtn src={EnqSetIcon} onClick={showModal} />
      )}

      {/* 제작함 커피콩 점3개 */}
      {props.type === "cbox" && modalOpen && (
        <div>
          <EnqSetModal
            onClose={unShowModal}
            isShared={props.isShared}
            enqId={props.cbId}
            enqName={props.cbName}
            setEnqName={setEnqName}
            cbList={props.cbList}
            abList={props.abList}
            type="cbox"
          />
          {/* <StyledEnqSetBtn src={EnqSetIcon} onClick={unShowModal} /> */}
        </div>
      )}

      {/* 참여함 커피콩 점3개 */}
      {props.type === "abox" && modalOpen && (
        <div
          style={{
            width: "400px",
            position: "absolute",
            bottom: "72px",
            right: "3px",
          }}
        >
          <EnqSetModal
            onClose={unShowModal}
            ansId={props.cbId}
            enqName={props.cbName}
            setEnqName={setEnqName}
            cbList={props.cbList}
            abList={props.abList}
            type="abox"
          />
        </div>
      )}

      {/* 샌드박스 커피콩 점3개 */}
      {props.type === "sbox" && modalOpen && (
        <div
          style={{
            width: "400px",
            position: "absolute",
            bottom: "72px",
            right: "10px",
          }}
        >
          <EnqSetModal
            onClose={unShowModal}
            enqId={props.cbId}
            enqName={props.cbName}
            cbList={props.cbList}
            type="sbox"
          />
        </div>
      )}

      {showLink && (
        <LinkCopyModal enqId={props.cbId} showLinkModal={showLinkModal} />
      )}
    </CoffeeBox>
  );
};
export default CoffeeBean;

const CoffeeBox = styled.div`
  width: 238px;
  height: 179px;
  border: 1.5px solid #21296b;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 750px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
`;

const EnqState = styled.div`
  position: absolute;
  top: 17px;
  z-index: 1;
  display: inline-block;
  width: 4rem;
  height: 1.5rem;
  text-align: center;
  vertical-align: center;
  background-color: hsl(234, 52%, 14%);
  color: white;
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 12px;
  font-weight: 620;
  width: 3.4rem;
  height: 1.5rem;
  border: 2px solid #2b234a;
  border-radius: 25px;
  padding-top: 5px;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
`;

const EnqPreview = styled.p`
  position: absolute;
  bottom: 7px;
  left: 43px;
  display: inline-block;
  width: 100vw;
  color: #1a2051;
  font-weight: 640;
`;

const StyledEnqSetBtn = styled.img`
  position: absolute;
  left: 231px;
  bottom: 64px;
  width: 1rem;
  height: 1rem;
`;

const GPSType = styled.img`
  position: absolute;
  left: 212px;
  bottom: 64px;
  width: 1rem;
  height: 1rem;
`;

const LINKType = styled.img`
  position: absolute;
  left: 212px;
  bottom: 64px;
  width: 1rem;
  heigth: 1rem;
`;

const CBIcon = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const DistrBtn = styled.button`
  display: inline-flex;
  flex-direction: row;
  position: absolute;
  left: 180px;
  bottom: 29px;
  font-family: "Noto Sans";
  font-size: 13px;
  font-weight: 400;
  border: 1px solid #1a2051;
  border-radius: 15px;
  padding: 0.3rem 0.5rem;
  color: #1a2051;
  background-color: white;
  width: 65px;
  align-items: center;
  justify-content: center;
`;

const FavCnt = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: 350;
`;

const DistanceInfo = styled.div`
  font-size: 15px;
  position: absolute;
  bottom: 4rem;
  right: -0.8rem;
  color: #1a2051;
`;