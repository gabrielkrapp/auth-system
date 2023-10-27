import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthRouteProps {
  children?: ReactNode;
  type: "protected" | "guest" | "fallback";
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children, type }) => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  useEffect(() => {
    if (type === "protected" && !isAuthenticated) {
      navigate("/login");
    } else if (type === "guest" && isAuthenticated) {
      navigate("/");
    } else if (type === "fallback") {
      isAuthenticated ? navigate("/") : navigate("/login");
    }
  }, [type, isAuthenticated, navigate]);

  return <>{children}</>;
};
