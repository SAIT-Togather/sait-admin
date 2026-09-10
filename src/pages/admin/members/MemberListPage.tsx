import { useRef, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { DataTable as DataTableType } from "primereact/datatable";

/* 공통 컴포넌트 */
import StatCard from "../../../components/common/StatCard";
import SearchPanel from "../../../components/common/SearchPanel";
import FormSelect from "../../../components/common/FormSelect";
import DateRangePicker from "../../../components/common/DateRangePicker";
import SearchInput from "../../../components/common/SearchInput";

/* 회원관리 전용 CSS */
import "../../../styles/pages/admin/member.css";


/* =========================================================
   TYPE
========================================================= */

interface Member {
  id: string;
  name: string;
  email: string;
  loginType: string;
  joinDate: string;
  lastLogin: string;
  status: "ACTIVE" | "INACTIVE";
  connected: boolean;
}

type DateRange = [Date | null, Date | null];


/* =========================================================
   SELECT OPTIONS
========================================================= */

const MEMBER_STATUS_OPTIONS = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "활성",
    value: "ACTIVE",
  },
  {
    label: "비활성",
    value: "INACTIVE",
  },
];

const LOGIN_TYPE_OPTIONS = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "Email",
    value: "EMAIL",
  },
  {
    label: "Kakao",
    value: "KAKAO",
  },
  {
    label: "Naver",
    value: "NAVER",
  },
  {
    label: "Apple",
    value: "APPLE",
  },
];


/* =========================================================
   MEMBER LIST PAGE
========================================================= */

function MemberListPage() {

  const dataTableRef =
    useRef<DataTableType<Member[]>>(null);

  /* =========================
     검색 조건
  ========================= */

  const [memberStatus, setMemberStatus] =
    useState("");

  const [loginType, setLoginType] =
    useState("");

  const [joinDateRange, setJoinDateRange] =
    useState<DateRange>([null, null]);

  const [keyword, setKeyword] =
    useState("");


  /* =========================
     회원 선택
  ========================= */

  const [selectedMembers, setSelectedMembers] =
    useState<Member[]>([]);


  /* =========================
     회원 데이터
     추후 API 데이터로 변경
  ========================= */

  const [members] = useState<Member[]>([
    {
      id: "user_0001",
      name: "김서연",
      email: "seoyeon.kim@example.com",
      loginType: "Apple",
      joinDate: "2024-05-24",
      lastLogin: "2024-05-30 14:32:21",
      status: "ACTIVE",
      connected: true,
    },
    {
      id: "user_0002",
      name: "이민호",
      email: "minho.lee@example.com",
      loginType: "Kakao",
      joinDate: "2024-05-24",
      lastLogin: "2024-05-30 09:15:44",
      status: "ACTIVE",
      connected: true,
    },
    {
      id: "user_0003",
      name: "박지훈",
      email: "jihoon.park@example.com",
      loginType: "Naver",
      joinDate: "2024-05-23",
      lastLogin: "2024-05-29 18:21:33",
      status: "INACTIVE",
      connected: false,
    },
  ]);


  /* =========================================================
     EVENT
  ========================================================= */

  const handleSearch = () => {

    const [startDate, endDate] =
      joinDateRange;

    console.log({
      memberStatus,
      loginType,
      startDate,
      endDate,
      keyword,
    });

    /*
     * 추후 API 호출
     *
     * getMemberList({
     *   memberStatus,
     *   loginType,
     *   startDate,
     *   endDate,
     *   keyword
     * });
     */
  };


  const handleReset = () => {

    setMemberStatus("");
    setLoginType("");
    setJoinDateRange([null, null]);
    setKeyword("");
  };


  const handleExcelDownload = () => {
    dataTableRef.current?.exportCSV();
  };


  const handleMemberDetail = (
    member: Member
  ) => {

    console.log(
      "회원 상세",
      member.id
    );

    /*
     * 추후 상세 페이지 이동
     *
     * navigate(
     *   `/admin/members/${member.id}`
     * );
     */
  };


  /* =========================================================
     DATA TABLE TEMPLATE
  ========================================================= */

  const statusBodyTemplate = (
    member: Member
  ) => {

    if (member.status === "ACTIVE") {

      return (
        <span className="badge badge-success">
          활성
        </span>
      );
    }

    return (
      <span className="badge badge-gray">
        비활성
      </span>
    );
  };


  const connectedBodyTemplate = (
    member: Member
  ) => {

    if (member.connected) {

      return (
        <span className="badge badge-success">
          연결됨
        </span>
      );
    }

    return (
      <span className="badge badge-danger">
        연결 안됨
      </span>
    );
  };


  const manageBodyTemplate = (
    member: Member
  ) => {

    return (
      <button
        type="button"
        className="btn btn-outline"
        onClick={() =>
          handleMemberDetail(member)
        }
      >
        상세
      </button>
    );
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="member-page">

      {/* =====================================================
          회원 현황
      ===================================================== */}

      <section className="member-summary-grid">

        <StatCard
          title="전체 회원 수"
          value={12480}
          unit="명"
          description="전체 누적 회원 수"
          icon="users"
        />

        <StatCard
          title="오늘 가입자 수"
          value={128}
          unit="명"
          description={
            <>
              어제 대비{" "}

              <span className="text-success">
                +18 (16.4%) ↑
              </span>
            </>
          }
          icon="user-plus"
          variant="success"
        />

        <StatCard
          title="활성 회원 수"
          value={8921}
          unit="명"
          description="전체의 71.5%"
          icon="active-user"
          variant="purple"
        />

        <StatCard
          title="연결된 회원 수"
          value={5304}
          unit="명"
          description="전체의 42.6%"
          icon="link"
          variant="warning"
        />

        <StatCard
          title="탈퇴 회원 수"
          value={1256}
          unit="명"
          description="전체의 10.1%"
          icon="calendar"
        />

      </section>


      {/* =====================================================
          검색 조건
      ===================================================== */}

      <SearchPanel
        className="member-search-layout"
        onSearch={handleSearch}
        onReset={handleReset}
      >

        <FormSelect
          label="회원 상태"
          value={memberStatus}
          options={MEMBER_STATUS_OPTIONS}
          onChange={setMemberStatus}
        />


        <FormSelect
          label="로그인 타입"
          value={loginType}
          options={LOGIN_TYPE_OPTIONS}
          onChange={setLoginType}
        />


        <DateRangePicker
          label="가입일"
          value={joinDateRange}
          onChange={setJoinDateRange}
        />


        <SearchInput
          label="검색어"
          value={keyword}
          placeholder="이름, 이메일, 아이디를 입력하세요"
          onChange={setKeyword}
          onEnter={handleSearch}
        />

      </SearchPanel>


      {/* =====================================================
          회원 목록
      ===================================================== */}

      <section className="card member-list-card">

        <div className="member-list-header">

          <span className="member-list-count">
            전체{" "}
            <strong>
              {members.length.toLocaleString()}
            </strong>
            건
          </span>


          <button
            type="button"
            className="btn btn-outline"
            onClick={handleExcelDownload}
          >
            엑셀 다운로드
          </button>

        </div>


        <DataTable
          ref={dataTableRef}
          value={members}
          dataKey="id"

          className="common-datatable"

          selectionMode="multiple"

          selection={selectedMembers}

          onSelectionChange={(e) =>
            setSelectedMembers(
              e.value as Member[]
            )
          }

          paginator

          rows={10}

          rowsPerPageOptions={[
            10,
            20,
            30,
            50,
          ]}

          emptyMessage="조회된 회원이 없습니다."
        >

          <Column
            selectionMode="multiple"
            headerStyle={{
              width: "48px",
            }}
          />

          <Column
            field="id"
            header="회원 ID"
          />

          <Column
            field="name"
            header="이름"
          />

          <Column
            field="email"
            header="이메일"
          />

          <Column
            field="loginType"
            header="로그인 타입"
          />

          <Column
            field="joinDate"
            header="가입일"
          />

          <Column
            field="lastLogin"
            header="최근 로그인"
          />

          <Column
            header="회원 상태"
            body={statusBodyTemplate}
          />

          <Column
            header="연결 상태"
            body={connectedBodyTemplate}
          />

          <Column
            header="관리"
            body={manageBodyTemplate}
          />

        </DataTable>

      </section>

    </div>
  );
}

export default MemberListPage;