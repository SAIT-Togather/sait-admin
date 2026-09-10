import {
  Users,
  UserRoundPlus,
  UserRoundCheck,
  Link2,
  CalendarDays,
  Megaphone,
  FileText,
  Settings,
  Clock3,
  Smartphone,
  Share2,
  CakeSlice,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FaApple } from "react-icons/fa";
import { SiKakao, SiNaver } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../../styles/pages/admin/dashboard.css";

type MemberStatus = "정상" | "휴면" | "차단";

type MemberRow = {
  id: number;
  name: string;
  loginType: "Apple" | "Kakao" | "Naver" | "Email";
  joinDate: string;
  status: MemberStatus;
};

type NoticeRow = {
  id: number;
  title: string;
  date: string;
  visible: boolean;
};

const memberRows: MemberRow[] = [
  { id: 1, name: "김서연", loginType: "Apple", joinDate: "2024-05-24", status: "정상" },
  { id: 2, name: "이민호", loginType: "Kakao", joinDate: "2024-05-24", status: "정상" },
  { id: 3, name: "박지훈", loginType: "Naver", joinDate: "2024-05-23", status: "휴면" },
  { id: 4, name: "최유진", loginType: "Email", joinDate: "2024-05-23", status: "정상" },
  { id: 5, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 6, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 7, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 8, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 9, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 10, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 11, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },
  { id: 12, name: "정다빈", loginType: "Apple", joinDate: "2024-05-22", status: "차단" },

];

const noticeRows: NoticeRow[] = [
  { id: 1, title: "SAIT 서비스 정기 점검 안내 (6/1)", date: "2024-05-30", visible: true },
  { id: 2, title: "앱 업데이트 2.3.0 안내", date: "2024-05-28", visible: true },
  { id: 3, title: "개인정보처리방침 변경 안내", date: "2024-05-20", visible: true },
  { id: 4, title: "서비스 이용약관 변경 안내", date: "2024-05-15", visible: false },
];

const accessChartData = [
  { date: "5/24", count: 21420 },
  { date: "5/25", count: 22610 },
  { date: "5/26", count: 20180 },
  { date: "5/27", count: 23840 },
  { date: "5/28", count: 25120 },
  { date: "5/29", count: 23190 },
  { date: "5/30", count: 24591 },
];

const loginTypeBody = (row: MemberRow) => {
  return (
    <div className="login-type-cell">

      {row.loginType === "Apple" && (
        <span className="login-provider-icon apple">
          <FaApple />
        </span>
      )}

      {row.loginType === "Kakao" && (
        <span className="login-provider-icon kakao">
          <img
            src="/images/kakao-logo.png"
            alt="Kakao"
          />
        </span>
      )}

      {row.loginType === "Naver" && (
        <span className="login-provider-icon naver">
          <SiNaver />
        </span>
      )}

      {row.loginType === "Email" && (
        <span className="login-provider-icon email">
          <MdOutlineEmail />
        </span>
      )}

      <span>{row.loginType}</span>
    </div>
  );
};

export default function Dashboard() {
  const memberStatusBody = (row: MemberRow) => {
    const statusClass =
      row.status === "정상"
        ? "success"
        : row.status === "휴면"
          ? "warning"
          : "danger";

    return <span className={`status-badge ${statusClass}`}>{row.status}</span>;
  };

  const memberDetailBody = () => (
    <button type="button" className="table-button">보기</button>
  );

  const noticeVisibleBody = (row: NoticeRow) => (
    <span className={`status-badge ${row.visible ? "success" : "gray"}`}>
      {row.visible ? "노출" : "비노출"}
    </span>
  );

  const noticeEditBody = () => (
    <button type="button" className="table-button">수정</button>
  );

  return (
    <div className="dashboard-page">
      <section className="dashboard-summary">
        <SummaryCard icon={<Users size={24} strokeWidth={1.8} />} title="전체 회원 수" value="12,480" description="전체 누적" />
        <SummaryCard icon={<UserRoundPlus size={24} strokeWidth={1.8} />} title="오늘 가입자 수" value="128" description="어제 대비" increase="+18 (16.4%) ↑" green />
        <SummaryCard icon={<UserRoundCheck size={24} strokeWidth={1.8} />} title="활성 회원 수" value="8,921" description="전체의 71.5%" />
        <SummaryCard icon={<Link2 size={24} strokeWidth={1.8} />} title="연결된 회원 수" value="5,304" description="전체의 42.6%" />
        <SummaryCard icon={<CalendarDays size={24} strokeWidth={1.8} />} title="오늘 생성된 일정 수" value="246" description="어제 대비" increase="+32 (15.0%) ↑" />
        <SummaryCard icon={<Megaphone size={24} strokeWidth={1.8} />} title="최근 공지사항" value="12건" description="전체 공지사항 기준" />
      </section>

      <section className="dashboard-row dashboard-row-top">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>회원 목록</h3>
            <button type="button" className="dashboard-text-button">전체 회원 보기</button>
          </div>

          <div className="dashboard-card-body dashboard-table-body">
            <DataTable
              value={memberRows}
              dataKey="id"
              className="dashboard-prime-table member-table"
              size="small"
              stripedRows={false}
              showGridlines={false}
              tableStyle={{ width: "100%" }}
            
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 15]}
              paginatorDropdownAppendTo={document.body}
            >
              <Column field="name" header="회원명" headerStyle={{ width: "20%" }} bodyStyle={{ width: "20%" }} />
              <Column field="loginType" header="로그인 타입" body={loginTypeBody} headerStyle={{ width: "22%" }} bodyStyle={{ width: "22%" }} />
              <Column field="joinDate" header="가입일" headerStyle={{ width: "24%" }} bodyStyle={{ width: "24%" }} />
              <Column field="status" header="회원 상태" body={memberStatusBody} headerStyle={{ width: "18%",textAlign: "center" }} bodyStyle={{ width: "18%",textAlign:"center" }} />
              <Column header="상세" body={memberDetailBody} bodyStyle={{textAlign:"center"}} headerStyle={{textAlign: "center"}}/>
            </DataTable>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>공지사항</h3>
            <button type="button" className="dashboard-primary-button">공지 등록</button>
          </div>

          <div className="dashboard-card-body dashboard-table-body">
            <DataTable
              value={noticeRows}
              dataKey="id"
              className="dashboard-prime-table notice-table"
              size="small"
              stripedRows={false}
              showGridlines={false}
              tableStyle={{ width: "100%" }}
            >
              <Column field="title" header="제목" headerStyle={{ width: "48%" }} bodyStyle={{ width: "48%" }} />
              <Column field="date" header="등록일" headerStyle={{ width: "20%" }} bodyStyle={{ width: "20%" }} />
              <Column field="visible" header="노출 여부" body={noticeVisibleBody} headerStyle={{ width: "17%",textAlign: "center" }} bodyStyle={{ width: "17%",textAlign: "center" }} />
              <Column header="수정" body={noticeEditBody} bodyStyle={{textAlign:"center"}} headerStyle={{textAlign: "center"}}/>
            </DataTable>

            <div className="dashboard-card-footer-link">전체 공지사항 보기</div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header"><h3>약관 관리</h3></div>
          <div className="dashboard-card-body">
            <div className="terms-list">
              <TermItem icon={<FileText size={19} />} title="이용약관" version="v2.1.0" />
              <TermItem icon={<Link2 size={19} />} title="개인정보처리방침" version="v2.0.3" />
              <TermItem icon={<Settings size={19} />} title="위치정보 약관" version="v1.3.0" />
              <TermItem icon={<Clock3 size={19} />} title="약관 버전 관리" />
            </div>
            <div className="dashboard-card-footer-link">전체 약관 버전 보기</div>
          </div>
        </div>
      </section>

      <section className="dashboard-row dashboard-row-statistics">
        <div className="dashboard-card">
          <div className="dashboard-card-header"><h3>가입 통계</h3><span className="dashboard-date">2024-05-24 ~ 2024-05-30</span></div>
          <div className="dashboard-card-body statistics-body">
            <div className="statistics-number-area">
              <StatisticNumber label="일별 가입자 수" value="128명" increase="+18 (16.4%)" />
              <StatisticNumber label="월별 가입자 수" value="3,842명" increase="+512 (15.4%)" />
            </div>
            <div className="statistics-chart-placeholder">
              <div className="donut-chart" />
              <div className="chart-legend"><span>Apple 38.6%</span><span>Kakao 29.4%</span><span>Naver 18.7%</span><span>Email 13.3%</span></div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header"><h3>접속 통계</h3><span className="dashboard-date">2024-05-24 ~ 2024-05-30</span></div>
          <div className="dashboard-card-body statistics-body">
            <div className="statistics-number-area">
              <StatisticNumber label="일별 접속 수" value="24,591회" increase="+2,341 (10.5%)" />
              <StatisticNumber label="활성 사용자 수(DAU)" value="8,921명" increase="+512 (6.1%)" />
            </div>
            <div className="line-chart-placeholder">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={accessChartData}
                  margin={{
                    top: 10,
                    right: 8,
                    left: -18,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#edf0f5"
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fill: "#98a2b3",
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 9,
                      fill: "#98a2b3",
                    }}
                    tickFormatter={(value) =>
                      `${Math.round(value / 1000)}k`
                    }
                  />

                  <Tooltip
                    cursor={{
                      stroke: "#d9e2f2",
                      strokeWidth: 1,
                    }}
                    formatter={(value) => [
                      `${Number(value).toLocaleString()}회`,
                      "접속 수",
                    ]}
                    labelFormatter={(label) =>
                      `${label} 접속 통계`
                    }
                    contentStyle={{
                      border: "1px solid #e4e9f1",
                      borderRadius: "8px",
                      fontSize: "11px",
                      boxShadow:
                        "0 6px 18px rgba(16,24,40,.08)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4f73e8"
                    strokeWidth={2.5}
                    dot={{
                      r: 3,
                      fill: "#ffffff",
                      stroke: "#4f73e8",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header"><h3>일정 통계</h3><span className="dashboard-date">2024-05-24 ~ 2024-05-30</span></div>
          <div className="dashboard-card-body schedule-stat-list">
            <ScheduleStat icon={<CalendarDays size={22} />} title="생성된 일정 수" value="1,842건" increase="+152 (9.0%)" />
            <ScheduleStat icon={<Share2 size={22} />} title="공유 일정 수" value="892건" increase="+68 (8.2%)" />
            <ScheduleStat icon={<CakeSlice size={22} />} title="기념일 등록 수" value="1,126건" increase="+110 (10.8%)" />
          </div>
        </div>
      </section>

      <section className="dashboard-card dashboard-settings">
        <div className="dashboard-card-header"><h3>서비스 설정</h3></div>
        <div className="dashboard-card-body settings-grid">
          <SettingItem icon={<Settings size={22} />} title="점검 모드" description="점검 모드 활성화 시 서비스가 제한됩니다.">
            <label className="switch"><input type="checkbox" /><span className="slider" /></label>
          </SettingItem>
          <SettingItem icon={<Users size={22} />} title="회원가입 허용 여부" description="회원가입을 허용/차단합니다.">
            <label className="switch"><input type="checkbox" defaultChecked /><span className="slider" /></label>
          </SettingItem>
          <SettingItem icon={<Clock3 size={22} />} title="초대코드 만료 시간" description="초대코드의 유효 기간을 설정합니다.">
            <select className="setting-select" defaultValue="7일"><option>7일</option><option>14일</option><option>30일</option></select>
          </SettingItem>
          <SettingItem icon={<Smartphone size={22} />} title="최소 지원 앱 버전" description="지원하는 최소 앱 버전을 설정합니다.">
            <input type="text" className="setting-input" defaultValue="2.0.0" />
          </SettingItem>
        </div>
        <div className="settings-save-area"><button type="button" className="dashboard-primary-button">저장</button></div>
      </section>
    </div>
  );
}

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  increase?: string;
  green?: boolean;
};

function SummaryCard({ icon, title, value, description, increase, green }: SummaryCardProps) {
  return (
    <div className="dashboard-summary-card">
      <div className={`dashboard-summary-icon ${green ? "green" : "blue"}`}>{icon}</div>
      <div className="dashboard-summary-info">
        <span className="dashboard-summary-label">{title}</span>
        <strong className="dashboard-summary-value">{value}</strong>
        <span className="dashboard-summary-description">{description}{increase && <strong className="dashboard-up">{increase}</strong>}</span>
      </div>
    </div>
  );
}

type TermItemProps = { icon: React.ReactNode; title: string; version?: string };
function TermItem({ icon, title, version }: TermItemProps) {
  return (
    <div className="term-item">
      <div className="term-info"><span className="term-icon">{icon}</span><span className="term-title">{title}</span></div>
      <div className="term-action">{version && <span className="term-version">{version}</span>}<button type="button" className="table-button">관리</button></div>
    </div>
  );
}

type StatisticNumberProps = { label: string; value: string; increase: string };
function StatisticNumber({ label, value, increase }: StatisticNumberProps) {
  return <div className="statistics-number"><span className="statistics-label">{label}</span><strong>{value}</strong><span>어제 대비<em>{increase}</em></span></div>;
}

type ScheduleStatProps = { icon: React.ReactNode; title: string; value: string; increase: string };
function ScheduleStat({ icon, title, value, increase }: ScheduleStatProps) {
  return (
    <div className="schedule-stat-item">
      <div className="schedule-stat-icon">{icon}</div>
      <div className="schedule-stat-info"><span>{title}</span><strong>{value}</strong></div>
      <div className="schedule-stat-increase">어제 대비<strong>{increase}</strong></div>
    </div>
  );
}

type SettingItemProps = { icon: React.ReactNode; title: string; description: string; children: React.ReactNode };
function SettingItem({ icon, title, description, children }: SettingItemProps) {
  return (
    <div className="setting-item">
      <div className="setting-info"><div className="setting-icon">{icon}</div><div><strong>{title}</strong><p>{description}</p></div></div>
      <div className="setting-control">{children}</div>
    </div>
  );
}
