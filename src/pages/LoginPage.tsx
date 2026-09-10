import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/authApi";

export default function LoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!adminId.trim()) {
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const result = await adminLogin({
        loginId: adminId,
        password,
      });
      console.log(result);
      if (result.role !== "ADMIN") {
        setErrorMessage("관리자 권한이 없는 계정입니다.");
        return;
      }

      /**
       * 운영 기준:
       * - accessToken만 sessionStorage에 저장
       * - refreshToken은 백엔드가 HttpOnly Cookie로 내려줌
       * - 프론트에서는 refreshToken 저장 금지
       */
      sessionStorage.setItem("SAIT_ACCESS_TOKEN", result.accessToken);

      /**
       * 아이디 저장은 보안 민감도가 낮으므로 localStorage 사용 가능
       */
      if (saveId) {
        localStorage.setItem("SAIT_SAVED_ADMIN_ID", adminId);
      } else {
        localStorage.removeItem("SAIT_SAVED_ADMIN_ID");
      }

      navigate("/admin/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "로그인 처리 중 오류가 발생했습니다.";
      console.log(message);

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflowY: "auto",
          boxSizing: "border-box",
          overflowX: "hidden",
          bgcolor: "#f4f9ff",
          background:
            "radial-gradient(circle at 50% 0%, #ffffff 0%, #f3f8ff 42%, #edf6ff 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: {
            xs: 1.5,
            sm: 2.5,
            md: 3,
          },
          py: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
        }}
      >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          minHeight: {
            xs: "auto",
            md: "calc(100vh - 92px)",
          },
          borderRadius: {
            xs: "18px",
            md: "28px",
          },
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1px solid rgba(198, 213, 234, 0.9)",
          boxShadow: "0 20px 60px rgba(45, 103, 180, 0.15)",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
        }}
      >
        <LeftVisual />

        <Box
          sx={{
            height: "100%",
            minHeight: 0,
            bgcolor: "rgba(255,255,255,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: {
              xs: 3,
              sm: 5,
              md: 6,
              lg: 8,
            },
            py: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "470px",
            }}
          >
            <Typography
              sx={{
                fontSize: "clamp(30px, 2.2vw, 40px)",
                fontWeight: 900,
                color: "#101828",
                letterSpacing: "-1.5px",
                lineHeight: 1.15,
              }}
            >
              관리자 로그인
            </Typography>

            <Typography
              sx={{
                mt: 1.2,
                fontSize: "14px",
                color: "#667085",
                fontWeight: 400,
              }}
            >
              관리자 계정으로 로그인하세요.
            </Typography>

            <Stack
              spacing={2.1}
              sx={{
                mt: "clamp(24px, 3vh, 34px)",
              }}
            >
              <Box>
                <Typography sx={labelSx}>아이디</Typography>

                <TextField
                  fullWidth
                  value={adminId}
                  onChange={(event) => setAdminId(event.target.value)}
                  placeholder="아이디를 입력하세요"
                  autoComplete="username"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon
                            sx={{ color: "#71809b", fontSize: 21 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  sx={textFieldSx}
                />
              </Box>

              <Box>
                <Typography sx={labelSx}>비밀번호</Typography>

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon
                            sx={{ color: "#71809b", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            sx={{
                              p: 0.7,
                            }}
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: "#71809b", fontSize: 22 }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ color: "#71809b", fontSize: 22 }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  sx={textFieldSx}
                />
              </Box>
            </Stack>

            {errorMessage && (
              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#e03131",
                }}
              >
                {errorMessage}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={saveId}
                  onChange={(event) => setSaveId(event.target.checked)}
                  sx={{
                    p: 0,
                    mr: 1.1,
                    color: "#b7c3d5",
                    "&.Mui-checked": {
                      color: "#2f80ed",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 21,
                    },
                  }}
                />
              }
              label="아이디 저장"
              sx={{
                mt: 2,
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#101828",
                  whiteSpace: "nowrap",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                mt: 2.6,
                height: "52px",
                borderRadius: "10px",
                fontSize: 18,
                fontWeight: 800,
                color: "#ffffff",
                background: "linear-gradient(180deg, #3c8dff 0%, #2575e8 100%)",
                boxShadow: "0 12px 24px rgba(47,128,237,0.23)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #2f80ed 0%, #1f6edc 100%)",
                },
                "&.Mui-disabled": {
                  color: "#ffffff",
                  opacity: 0.7,
                },
              }}
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                mt: "clamp(18px, 2.4vh, 26px)",
                width: "100%",
              }}
            >
              <Box sx={lineSx} />

              <Typography
                sx={{
                  px: 2,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#75839b",
                  whiteSpace: "nowrap",
                }}
              >
                또는
              </Typography>

              <Box sx={lineSx} />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                mt: "clamp(16px, 2vh, 22px)",
                width: "100%",
              }}
            >
              <BottomLink icon={<LockOutlinedIcon />} label="비밀번호 찾기" />

              <Box
                sx={{
                  mx: 2.1,
                  width: "1px",
                  height: 20,
                  bgcolor: "#d5dfec",
                  flexShrink: 0,
                }}
              />

              <BottomLink icon={<HeadsetMicOutlinedIcon />} label="관리자 문의" />
            </Stack>
          </Box>
        </Box>
      </Box>

      <Stack
        alignItems="center"
        spacing={0.1}
        sx={{
          mt: 1,
          flexShrink: 0,
          minHeight: "34px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.7}>
          <VerifiedUserOutlinedIcon
            sx={{
              color: "#4d8ff7",
              fontSize: 18,
            }}
          />

          <Typography
            sx={{
              color: "#5f6f88",
              fontSize: 12,
              lineHeight: 1.2,
            }}
          >
            보안 접속 환경에서 안전하게 로그인됩니다.
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: "#5f6f88",
            fontSize: 12,
            lineHeight: 1.2,
          }}
        >
          © SAIT. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
}

function LeftVisual() {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        position: "relative",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        bgcolor: "#eef7ff",
      }}
    >
      <VisualImage />

      {/* 왼쪽 상단 로고 */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.8}
        sx={{
          position: "absolute",
          top: "4.2%",
          left: "4.8%",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            width: 68,
            height: 68,
            borderRadius: "15px",
            bgcolor: "#ffffff",
            boxShadow: "0 14px 30px rgba(37,112,224,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SaitLogoMark />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "5px",
              color: "#101828",
              lineHeight: 1,
            }}
          >
            SAIT
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "3px",
              color: "#667085",
            }}
          >
           ADMIN
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          position: "absolute",
          top: "23%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          width: "100%",
          textAlign: "center",
          px: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "clamp(22px, 2vw, 30px)",
            fontWeight: 400,
            color: "#101828",
            letterSpacing: "-0.04em",
            lineHeight: 1.3,
          }}
        >
          사잇과 함께 만드는
        </Typography>

        <Typography
          sx={{
            mt: 1.2,
            fontSize: "clamp(32px, 3vw, 44px)",
            fontWeight: 900,
            color: "#2f80ed",
            letterSpacing: "-0.05em",
            lineHeight: 1.25,
          }}
        >
          더 나은 연결의 시작
        </Typography>

        <Typography
          sx={{
            mt: 4,
            fontSize: "clamp(16px, 1.5vw, 21px)",
            fontWeight: 400,
            color: "#2f3a4d",
            letterSpacing: "-0.04em",
            lineHeight: 1.65,
          }}
        >
          사잇 관리자 페이지에서
          <br />
          모든 서비스를 편리하게 관리하세요.
        </Typography>
      </Box>
    </Box>
  );
}


function VisualImage() {
  return (
    <Box
      component="img"
      src="/images/login-visual.png"
      alt="SAIT Login Visual"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        zIndex: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}


function SaitLogoMark() {
  return (
    <Box
      component="img"
      src="/images/sait-logo.png"
      alt="SAIT Logo"
      sx={{
        width: 76,
        height: 76,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}


function BottomLink({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="text"
      startIcon={icon}
      disableRipple
      sx={{
        minWidth: "auto",
        px: 1,
        color: "#101828",
        fontSize: 13,
        fontWeight: 800,
        whiteSpace: "nowrap",
        flexShrink: 0,
        "& .MuiButton-startIcon": {
          color: "#73809a",
          mr: 0.7,
          "& svg": {
            fontSize: 16,
          },
        },
        "&:hover": {
          bgcolor: "transparent",
          color: "#2f80ed",
        },
      }}
    >
      {label}
    </Button>
  );
}

const labelSx = {
  mb: 1,
  fontSize: 14,
  fontWeight: 800,
  color: "#101828",
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: "50px",
    borderRadius: "10px",
    bgcolor: "#ffffff",
    fontSize: 14,
    color: "#101828",
    "& fieldset": {
      borderColor: "#ccd7e8",
    },
    "&:hover fieldset": {
      borderColor: "#9fb8da",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2f80ed",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    py: 0,
    "&::placeholder": {
      color: "#8b98ab",
      opacity: 1,
    },
  },
};

const lineSx = {
  flex: 1,
  height: "1px",
  bgcolor: "#dbe4f0",
};