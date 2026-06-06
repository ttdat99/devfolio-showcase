import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider } from "@/contexts/admin-auth-context";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
import { ProtectedAdminRoute } from "@/components/admin/protected-admin-route";
import { AdminLayout } from "@/components/admin/admin-layout";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/admin-login-page";
import DashboardPage from "./pages/admin/dashboard-page";
import SkillsManagementPage from "./pages/admin/skills-management-page";
import WorkManagementPage from "./pages/admin/work-management-page";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <LanguageProvider>
      <AdminAuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/admin/management" element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="skills" element={<SkillsManagementPage />} />
                    <Route path="work" element={<WorkManagementPage />} />
                    <Route path="settings" element={<div className="text-muted-foreground">Settings — coming soon</div>} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  </ThemeProvider>
  </GoogleOAuthProvider>
);

export default App;

