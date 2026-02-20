import { TranslationKeys } from "./en";

export const vi: TranslationKeys = {
  // Navbar
  nav: {
    about: "Giới thiệu",
    skills: "Kỹ năng",
    projects: "Dự án",
    blog: "Blog",
    contact: "Liên hệ",
  },
  
  // Hero Section
  hero: {
    greeting: "Xin chào, tôi là",
    name: "Trương Thành Đạt",
    viewProjects: "Xem dự án",
    contactMe: "Liên hệ",
  },
  
  // About Section
  about: {
    title: "Giới thiệu",
    heading: "Tôi là một lập trình viên tò mò và đam mê.",
    paragraph1: "Tôi là một kỹ sư backend chuyên thiết kế các hệ thống có khả năng mở rộng và bảo trì. Với chuyên môn sâu về Java và hệ sinh thái Spring, tôi tập trung vào việc tạo ra các API sạch, tối ưu hóa hiệu suất cơ sở dữ liệu và thiết kế các giải pháp xử lý quy mô thực tế.",
    paragraph2: "Công việc của tôi bao gồm phát triển RESTful API, kiến trúc microservice, thiết kế hệ thống và tối ưu hóa hiệu suất. Tôi đam mê viết code không chỉ hoạt động tốt mà còn tinh tế — và chia sẻ những gì tôi học được thông qua viết kỹ thuật.",
    downloadCV: "Tải CV",
  },
  
  // Skills Section
  skills: {
    title: "Kỹ năng",
    heading: "Công nghệ & công cụ.",
    backend: "Backend",
    database: "Cơ sở dữ liệu",
    devops: "DevOps",
  },
  
  // Projects Section
  projects: {
    title: "Dự án",
    heading: "Dự án nổi bật.",
    code: "Code",
    demo: "Demo",
    preview: "Xem trước",
    month: "tháng",
    months: "tháng",
    year: "năm",
    years: "năm",
    present: "Hiện tại",
    lessThanMonth: "< 1 tháng",
    overview: "Tổng quan",
    projectInfo: "Thông tin dự án",
    customer: "Khách hàng",
    teamSize: "Quy mô nhóm",
    members: "thành viên",
    technologies: "Công nghệ sử dụng",
    backToHome: "Về trang chủ",
    projectNotFound: "Không tìm thấy dự án",
    projectNotFoundDesc: "Dự án bạn đang tìm kiếm không tồn tại.",
  },
  
  // Blog Section
  blog: {
    title: "Blog",
    heading: "Bài viết mới nhất.",
    latestArticles: "Bài viết mới nhất",
    subtitle: "Suy nghĩ về phát triển phần mềm, kiến trúc và công nghệ. Chia sẻ kiến thức và kinh nghiệm từ việc xây dựng các hệ thống có khả năng mở rộng.",
    readMore: "Đọc thêm",
  },
  
  // Contact Section
  contact: {
    title: "Liên hệ",
    heading: "Liên hệ với tôi.",
    subtitle: "Có một dự án trong đầu hay muốn trò chuyện? Gửi tin nhắn hoặc kết nối qua mạng xã hội.",
    name: "Tên",
    namePlaceholder: "Trương Thành Đạt",
    email: "Email",
    emailPlaceholder: "ban@vidu.com",
    message: "Tin nhắn",
    messagePlaceholder: "Tin nhắn của bạn...",
    send: "Gửi tin nhắn",
    successMessage: "Cảm ơn bạn đã liên hệ! (Đây là bản demo — không có tin nhắn nào được gửi.)",
  },
  
  // Footer
  footer: {
    builtWith: "Được xây dựng với React, TypeScript & TailwindCSS",
    rights: "Bảo lưu mọi quyền.",
  },
  
  // Not Found Page
  notFound: {
    title: "404",
    heading: "Không tìm thấy trang",
    description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.",
    backHome: "Về trang chủ",
  },
  
  // Language Toggle
  language: {
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    code: "ENG",
    codeVi: "VI",
  },
  
  // Date formatting
  date: {
    locale: "vi-VN",
    monthFormat: { month: "short", year: "numeric" } as const,
    fullDateFormat: { year: "numeric", month: "long", day: "numeric" } as const,
  },
};
