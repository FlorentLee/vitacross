import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navigation & Common
  "home": { en: "Home", zh: "首页" },
  "online_consultation": { en: "Specialist Consultation", zh: "专家咨询" },
  "lab_tests": { en: "Medical Check-up", zh: "体检" },
  "medical_tourism": { en: "Medical Tourism", zh: "医疗旅游" },
  "healing_journey": { en: "Healing Journey", zh: "康养之旅" },
  "legal_support": { en: "Legal Support", zh: "法律支持" },
  "sign_in": { en: "Sign In", zh: "登录" },
  "register": { en: "Registration", zh: "注册" },
  "book_consultation": { en: "Book Consultation", zh: "预约咨询" },
  "consult_now": { en: "Consult Now", zh: "立即咨询" },
  "logout": { en: "Logout", zh: "退出登录" },
  "learn_more": { en: "Learn More", zh: "了解更多" },
  "footer_desc": { en: "Connecting global patients with world-class medical services in China. Your Gateway to Safe, Premium Medical Travel in China.", zh: "连接全球患者与中国顶尖医疗服务。您通往中国安全、高端医疗旅游的门户。" },
  "services": { en: "Services", zh: "服务" },
  "contact": { en: "Contact", zh: "联系我们" },
  "available_247": { en: "Available 24/7", zh: "24/7 全天候在线" },
  "rights_reserved": { en: "All rights reserved.", zh: "保留所有权利。" },

  // Home Page
  "home_tagline": { en: "China Medical Tourism, Choose VitaCross - Borderless Care", zh: "来中国医疗旅游，选择 VitaCross — 无国界医疗" },
  "home_connect_today": { en: "Your Gateway to Safe, Premium Medical Tourism in China", zh: "您通往中国安全、高端医疗旅游的门户" },
  "home_our_services": { en: "Our Services", zh: "我们的服务" },
  "home_services_desc": { en: "Comprehensive medical solutions tailored to your needs", zh: "为您量身定制的全面医疗解决方案" },
  "home_why_choose": { en: "Why Choose VitaCross", zh: "为什么选择 VitaCross" },
  "home_why_desc": { en: "Excellence in international medical care", zh: "卓越的国际医疗服务" },
  "home_why_1": { en: "Expert medical professionals with advanced degrees", zh: "拥有高级学位的专家医疗人员" },
  "home_why_2": { en: "24/7 multilingual support and guidance", zh: "24/7 多语言支持与指导" },
  "home_why_3": { en: "Transparent pricing and comprehensive packages", zh: "透明的定价与全面套餐" },
  "home_why_4": { en: "Seamless visa and travel arrangements", zh: "无缝签证与行程安排" },
  "home_why_5": { en: "Comfortable medical facilities and accommodation", zh: "舒适的医疗设施与住宿" },
  "home_why_6": { en: "Personalized treatment and recovery plans", zh: "个性化治疗与康复计划" },
  "home_why_7": { en: "Pre-travel Assessment", zh: "行前评估" },
  "home_why_8": { en: "Legal Support", zh: "法律支持" },
  "home_global_network": { en: "Global Patient Network", zh: "全球患者网络" },
  "home_partner_hospitals": { en: "Partner Hospitals", zh: "合作医院" },
  "home_patients_served": { en: "International Patients Served", zh: "服务的国际患者" },
  "home_satisfaction_rate": { en: "Patient Satisfaction Rate", zh: "患者满意度" },
  "home_ready_start": { en: "Ready to Start Your Medical Journey?", zh: "准备好开始您的医疗之旅了吗？" },
  "home_take_step": { en: "Online specialist consultations ✅ Professional health check-ups ✅ Tailored healing journeys ✅ Partnered with top law firms to protect your rights every step of the way.", zh: "在线专家咨询 ✅ 专业健康体检 ✅ 定制疗愈之旅 ✅ 携手顶级律所全程保障您的权益。" },
  "home_book_now": { en: "Book Consultation Now", zh: "立即预约咨询" },
  "service_online_consultation_desc": { en: "$17.99 per session. Direct access to specialist doctors with 80% holding PhDs and years of clinical experience.", zh: "每次 $17.99。直接联系拥有医学博士学位和多年临床经验的专家医生。" },
  "service_lab_tests_desc": { en: "Advanced diagnostics with MRI, ultrasound, and more. Available nationwide across China.", zh: "MRI、超声等先进诊断。服务覆盖中国全国。" },
  "service_medical_tourism_desc": { en: "Complete medical tourism packages from visa to recovery. Comfort and care throughout your journey.", zh: "从签证到康复的完整医疗旅游套餐。全程舒适与关怀。" },
  "service_healing_journey_desc": { en: "Rejuvenate with our Tai Chi healing programs. Combine treatment with wellness and cultural experiences.", zh: "通过太极疗愈焕发活力。结合治疗、养生与文化体验。" },
  "service_legal_support_desc": { en: "Professional legal assistance for medical disputes. One-stop solution for patient rights protection.", zh: "专业的医疗纠纷法律援助。一站式患者权益保护方案。" },

  // Online Consultation Page (Renamed to Specialist Consultation in Nav, keeping keys same for now)
  "oc_hero_tag": { en: "Expert Medical Consultation", zh: "专家医疗咨询" },
  "oc_hero_title": { en: "Connect with Specialist Doctors", zh: "联系专科医生" },
  "oc_hero_desc": { en: "VitaCross offers one-on-one online consultations with specialist physicians. Our platform connects you with over 10,000 experienced specialists, 80% of whom hold doctoral degrees and all of whom have extensive clinical experience. No long waits or complicated bookings—our fast, high-quality, and accurate service ensures your medical consultation needs are efficiently met.", zh: "VitaCross 提供专家医生一对一在线咨询。我们的平台连接超过 10,000 名经验丰富的专家，其中 80% 拥有博士学位，且均具备丰富的临床经验。无需漫长等待或繁琐预约——我们快速、优质、精准的服务确保高效满足您的医疗咨询需求。" },
  "oc_book_price": { en: "Book Consultation - $17.99", zh: "预约咨询 - $17.99" },
  "oc_why_title": { en: "Why Choose Our Specialist Consultation", zh: "为什么选择我们的专家咨询" },
  "oc_why_desc": { en: "Affordable, accessible, and expert medical guidance", zh: "实惠、便捷、专业的医疗指导" },
  "oc_expert_doctors": { en: "Expert Doctors", zh: "专家医生" },
  "oc_expert_doctors_desc": { en: "80% of our doctors hold Doctor of Medicine with years of clinical experience", zh: "80%的医生拥有医学博士学位及多年临床经验" },
  "oc_quick_response": { en: "Quick Response", zh: "快速响应" },
  "oc_quick_response_desc": { en: "Get Instant Access to Your Specialist – No Waiting, No Hassle", zh: "即时联系专家 – 无需等待，无忧咨询" },
  "oc_personalized_care": { en: "Personalized Care", zh: "个性化护理" },
  "oc_personalized_care_desc": { en: "Tailored treatment recommendations based on your condition", zh: "根据您的病情量身定制治疗建议" },
  "oc_affordable": { en: "Affordable", zh: "价格实惠" },
  "oc_affordable_desc": { en: "Professional consultation at just $17.99 per session", zh: "专业咨询仅需 $17.99" },
  "oc_team_title": { en: "Our Expert Team", zh: "我们的专家团队" },
  "oc_team_desc": { en: "80% of our doctors hold Doctor of Medicine with extensive clinical experience", zh: "80%的医生拥有医学博士学位及丰富的临床经验" },
  "oc_how_title": { en: "How It Works", zh: "服务流程" },
  "oc_how_desc": { en: "Simple steps to get expert medical advice", zh: "简单几步获取专家建议" },
  "oc_step_1_title": { en: "Submit Your Case", zh: "提交病例" },
  "oc_step_1_desc": { en: "Provide your medical history, symptoms, and any relevant test results", zh: "提供您的病史、症状及相关检查结果" },
  "oc_step_2_title": { en: "Expert Review", zh: "专家评估" },
  "oc_step_2_desc": { en: "Our specialist doctors review your case thoroughly", zh: "专科医生彻底评估您的病例" },
  "oc_step_3_title": { en: "Diagnosis & Recommendation", zh: "诊断与建议" },
  "oc_step_3_desc": { en: "Receive professional diagnosis and treatment recommendations", zh: "获得专业诊断及治疗建议" },
  "oc_step_4_title": { en: "Next Steps", zh: "下一步" },
  "oc_step_4_desc": { en: "Decide whether to pursue treatment in China or your home country", zh: "决定是在中国治疗还是回国治疗" },
  "oc_pricing_title": { en: "Transparent Pricing", zh: "透明定价" },
  "oc_pricing_desc": { en: "No hidden fees, just expert medical advice", zh: "无隐藏费用，仅收专家建议费" },
  "oc_per_session": { en: "Per Consultation Session", zh: "每次咨询" },
  "oc_assessment": { en: "Expert doctor assessment", zh: "专家医生评估" },
  "oc_recommendations": { en: "Treatment recommendations", zh: "治疗建议" },
  "oc_followup": { en: "Follow-up guidance", zh: "随访指导" },
  "oc_cta_title": { en: "Get Expert Medical Advice Today", zh: "今天获取专家医疗建议" },
  "oc_cta_desc": { en: "Connect with specialist doctors who can help you make the right decision for your health", zh: "联系专科医生，帮您做出正确的健康决策" },

  // Lab Tests Page
  "lab_hero_tag": { en: "Medical Check-up", zh: "健康体检" },
  "lab_hero_title": { en: "Professional Medical Check-up & Diagnostics in China", zh: "中国专业健康体检与诊断" },
  "lab_hero_desc": { en: "Access advanced medical testing—including MRI, ultrasound, and comprehensive diagnostics—available nationwide across China through internationally accredited partner institutions certified under ISO 9001 and ISO 15189.", zh: "通过 ISO 9001 和 ISO 15189 认证的国际认可合作机构，在全国范围内获得包括 MRI、超声和全面诊断在内的先进医疗检测服务。" },
  "lab_consult_btn": { en: "Consult About Check-ups", zh: "咨询体检服务" },
  "lab_why_title": { en: "Why Choose Our Medical Check-up Services", zh: "为什么选择我们的体检服务" },
  "lab_why_desc": { en: "State-of-the-art equipment and expert technicians", zh: "最先进的设备和专家技术人员" },
  "lab_equip_title": { en: "Advanced Equipment", zh: "先进设备" },
  "lab_equip_desc": { en: "Advanced diagnostic equipment operated within laboratories accredited under ISO 9001 and ISO 15189 standards.", zh: "在 ISO 9001 和 ISO 15189 标准认证实验室中运行的先进诊断设备。" },
  "lab_coverage_title": { en: "Nationwide Coverage", zh: "全国覆盖" },
  "lab_coverage_desc": { en: "Testing centers across China for your convenience", zh: "检测中心遍布中国，方便您的就医" },
  "lab_analysis_title": { en: "Expert Analysis", zh: "专家分析" },
  "lab_analysis_desc": { en: "Detailed reports from experienced technicians", zh: "经验丰富的技术人员出具详细报告" },
  "lab_results_title": { en: "Quick Results", zh: "快速结果" },
  "lab_results_desc": { en: "Fast turnaround time for test results", zh: "检测结果周转时间快" },
  "lab_packages_title": { en: "Check-up Packages", zh: "体检套餐" },
  "lab_packages_desc": { en: "Choose from our comprehensive check-up packages", zh: "选择我们的全面体检套餐" },
  "lab_pkg_basic": { en: "Basic Package", zh: "基础套餐" },
  "lab_pkg_comprehensive": { en: "Comprehensive Package", zh: "全面套餐" },
  "lab_pkg_premium": { en: "Premium Package", zh: "高级套餐" },
  "lab_most_popular": { en: "Most Popular", zh: "最受欢迎" },
  "lab_select_pkg": { en: "Select Package", zh: "选择套餐" },
  "lab_custom_title": { en: "Custom Health Checkup", zh: "定制健康体检" },
  "lab_custom_subtitle": { en: "Customize your Health Checkup service according to your needs.", zh: "根据你的需求定制你的Health Checkup服务" },
  "lab_custom_desc": { en: "Our medical experts will design a custom diagnostic plan based on your medical history, symptoms, and health goals.", zh: "我们的医疗专家将根据您的病史、症状和健康目标设计定制诊断计划。" },
  "lab_consult_custom": { en: "Consult Custom Plan", zh: "咨询定制计划" },
  "lab_available_title": { en: "Available Services", zh: "可用服务" },
  "lab_available_desc": { en: "Comprehensive range of medical testing options", zh: "全面的医疗检测选项" },
  "lab_cta_title": { en: "Schedule Your Medical Check-up Today", zh: "今天安排您的健康体检" },
  "lab_cta_desc": { en: "Get comprehensive health screening with our advanced diagnostic services", zh: "利用我们先进的诊断服务进行全面健康筛查" },
  "lab_book_now": { en: "Book Your Check-up Now", zh: "立即预约体检" },

  // Medical Tourism Page
  "mt_hero_tag": { en: "Medical Tourism Services", zh: "医疗旅游服务" },
  "mt_hero_title": { en: "Comfortable Medical Tourism Experience", zh: "舒适的医疗旅游体验" },
  "mt_hero_desc": { en: "VitaCross delivers end-to-end medical travel services. From pre-tourism medical assessments and personalized treatment plans to travel coordination and post-treatment recovery back home, we support you at every step. In the event of any medical dispute, our professional legal team will act immediately to protect your rights—so you can experience the richness of Chinese culture while receiving high-quality medical care with complete confidence.", zh: "VitaCross 提供端到端的医疗旅游服务。从行前医疗评估和个性化治疗方案，到行程协调和回国后的康复，我们全程为您提供支持。如果发生任何医疗纠纷，我们的专业法律团队将立即采取行动保护您的权益——让您在充满信心地接受高质量医疗服务的同时，体验中国文化的丰富内涵。" },
  "mt_plan_now": { en: "Plan Your Medical Tourism Now", zh: "立即规划您的医疗旅游" },
  "mt_services_title": { en: "Complete Travel Services", zh: "全方位旅游服务" },
  "mt_services_desc": { en: "From visa processing to medical arrangements, from accommodation to daily life, we carefully plan every detail for you", zh: "从签证办理到医疗安排，从住宿到日常生活，我们为您精心规划每一个细节" },

  // Updated Medical Tourism Services
  "mt_assessments_title": { en: "Medical Assessments", zh: "医疗评估" },
  "mt_assessments_desc": { en: "Pre-travel online diagnosis by specialists to assess necessity of travel and provide treatment advice.", zh: "专科医生行前在线诊断，评估赴华治疗必要性并提供治疗建议。" },
  "mt_treatment_title": { en: "Personalized Treatment Plans", zh: "个性化治疗方案" },
  "mt_treatment_desc": { en: "We match you with the best doctors and hospitals for your condition to ensure the optimal treatment plan.", zh: "为您匹配最适合病情的顶尖医生和医院，制定最佳治疗方案。" },
  "mt_visa_title": { en: "Visa & Travel", zh: "签证与出行" },
  "mt_visa_desc": { en: "Expedited medical visa processing, international flight arrangements, travel advice and itinerary planning", zh: "加急医疗签证办理，国际航班安排，旅行建议及行程规划" },
  "mt_accom_title": { en: "Premium Accommodation", zh: "高级住宿" },
  "mt_accom_desc": { en: "Luxury Accommodation in the center of the City – Receive World-Class Medical Care While Exploring Urban Highlights.", zh: "市中心豪华住宿——在探索城市亮点的同时享受世界级医疗护理。" },
  "mt_companion_title": { en: "Companion & Translation", zh: "陪同与翻译" },
  "mt_companion_desc": { en: "Professional medical translator accompanying throughout, assisting with communication and daily matters", zh: "专业医疗翻译全程陪同，协助沟通及日常事务" },
  "mt_dispute_title": { en: "Medical Dispute Resolution", zh: "医疗纠纷解决" },
  "mt_dispute_desc": { en: "Collaboration with professional legal teams to fully protect your rights and interests.", zh: "与专业律师团队合作，全力保障您的合法权益。" },

  "mt_process_title": { en: "Medical Tourism Process", zh: "医疗旅游流程" },
  "mt_process_desc": { en: "We provide complete process support from preparation to recovery", zh: "我们提供从准备到康复的全流程支持" },
  "mt_process_1": { en: "Consultation & Assessment", zh: "咨询评估" },
  "mt_process_2": { en: "Visa Processing", zh: "签证办理" },
  "mt_process_3": { en: "Itinerary Planning", zh: "行程规划" },
  "mt_process_4": { en: "Departure Preparation", zh: "行前准备" },
  "mt_process_5": { en: "Medical Treatment", zh: "医疗治疗" },
  "mt_process_6": { en: "Recovery Care", zh: "康复护理" },
  "mt_process_7": { en: "Return Home", zh: "回国安排" },
  "mt_process_8": { en: "Remote Follow-up", zh: "远程随访" },

  "mt_process_extra_title": { en: "Legal Safeguard", zh: "法律保障" },
  "mt_process_extra_desc": { en: "In case of any disputes, our legal team steps in immediately to protect your rights.", zh: "如有任何纠纷，我们的法律团队将立即介入以维护您的权益。" },

  "mt_why_title": { en: "Why Choose VitaCross Medical Tourism", zh: "为什么选择 VitaCross 医疗旅游" },
  "mt_why_desc": { en: "We provide not just medical services, but a complete travel experience", zh: "我们提供的不仅是医疗服务，更是完整的旅行体验" },
  // Why Choose items
  "mt_why_team": { en: "Professional medical team and travel advisors", zh: "专业的医疗团队和旅行顾问" },
  "mt_why_trans": { en: "Full-time Chinese or English translator accompaniment", zh: "专职中英文翻译陪同" },
  "mt_why_price": { en: "Transparent pricing and fee structure", zh: "透明的定价和收费结构" },
  "mt_why_support": { en: "24/7 emergency support", zh: "24/7 紧急支持" },
  "mt_why_env": { en: "Comfortable medical wellness environment", zh: "舒适的医疗康养环境" },
  "mt_why_culture": { en: "Cultural experience and recovery activities", zh: "文化体验和康复活动" },
  "mt_why_remote": { en: "Post-return remote medical support", zh: "回国后远程医疗支持" },
  "mt_why_law_firm": { en: "Cooperation support with law firm", zh: "与律师事务所合作支持" },

  "mt_cta_title": { en: "Ready to Start Your Medical Tourism?", zh: "准备好开始您的医疗旅游了吗？" },
  "mt_cta_desc": { en: "Let us plan a comfortable and worry-free medical travel experience for you", zh: "让我们为您规划一次舒适无忧的医疗之旅" },
  "mt_download_guide": { en: "Download Travel Guide", zh: "下载旅游指南" },
  "mt_testim_title": { en: "Patient Testimonials", zh: "患者评价" },
  "mt_testim_1_text": { en: "The legal support gave me peace of mind knowing I was protected in a foreign country.", zh: "法律支持让我感到安心，知道自己在异国他乡也能得到保护。" },
  "mt_testim_1_author": { en: "Sarah, UK", zh: "Sarah, 英国" },
  "mt_testim_2_text": { en: "The pre-travel assessment was thorough and saved me an unnecessary trip. Highly professional.", zh: "行前评估非常彻底，帮我省去了一次不必要的行程。非常专业。" },
  "mt_testim_2_author": { en: "Mike, USA", zh: "Mike, 美国" },
  "mt_testim_3_text": { en: "Treatment plans in China are much cheaper than in my country, and they booked my surgery very quickly.", zh: "在中国治疗的方案比我们国家便宜很多，而且很快帮我预约上了手术。" },
  "mt_testim_3_author": { en: "John, Canada", zh: "John, 加拿大" },

  // Healing Journey Page
  "hj_hero_tag": { en: "Healing & Wellness", zh: "疗愈与健康" },
  "hj_hero_title": { en: "Rejuvenate Your Body and Mind", zh: "焕发身心活力" },
  "hj_hero_desc": { en: "Experience the ancient art of TaiChi, guided fasting, and KongFu in China—choose from 3, 7, or 14-day immersive retreats.", zh: "体验中国古老的太极艺术、辟谷指导和功夫——选择 3天、7天或 14天的沉浸式静修。" },
  "hj_book_btn": { en: "Book Your Healing Journey", zh: "预订您的疗愈之旅" },
  "hj_why_title": { en: "Why Choose Our Retreats", zh: "为什么选择我们的静修" },
  "hj_reason_1_title": { en: "Holistic Healing", zh: "整体疗愈" },
  "hj_reason_1_desc": { en: "Integrate body, mind, and spirit with guided TaiChi, KongFu and fasting practices.", zh: "通过太极、功夫和辟谷练习，整合身、心、灵。" },
  "hj_reason_2_title": { en: "Professional Guidance", zh: "专业指导" },
  "hj_reason_2_desc": { en: "Experienced instructors and wellness specialists ensure safety and effectiveness.", zh: "经验丰富的导师和健康专家确保安全与效果。" },
  "hj_reason_3_title": { en: "Customizable Retreats", zh: "定制静修" },
  "hj_reason_3_desc": { en: "Choose 3, 7, or 14-day journeys tailored to your needs.", zh: "选择 3天、7天或 14天，为您量身定制。" },
  "hj_reason_4_title": { en: "Serene Locations", zh: "宁静地点" },
  "hj_reason_4_desc": { en: "Tranquil, natural environments away from urban stress.", zh: "远离城市压力的宁静自然环境。" },
  "hj_reason_5_title": { en: "Cultural Immersion", zh: "文化沉浸" },
  "hj_reason_5_desc": { en: "Learn authentic TaiChi and traditional Chinese wellness philosophy.", zh: "学习正宗太极和中国传统养生哲学。" },
  "hj_reason_6_title": { en: "International-Friendly Experience", zh: "国际友好体验" },
  "hj_reason_6_desc": { en: "Designed for international guests, with clear guidance and support at every stage of your journey.", zh: "专为国际宾客设计，旅程每一步都有清晰指导和支持。" },
  "hj_packages_title": { en: "Retreat Packages", zh: "静修套餐" },
  "hj_packages_desc": { en: "Choose the journey that fits your schedule and goals", zh: "选择适合您日程和目标的旅程" },
  "hj_pkg_3day": { en: "3-Day Refresh", zh: "3天焕新" },
  "hj_pkg_3day_cta": { en: "Book 3-Day Retreat", zh: "预订 3天静修" },
  "hj_pkg_7day": { en: "7-Day Rebalance", zh: "7天平衡" },
  "hj_pkg_7day_cta": { en: "Book 7-Day Retreat", zh: "预订 7天静修" },
  "hj_pkg_14day": { en: "14-Day Deep Renewal", zh: "14天深度更新" },
  "hj_pkg_14day_cta": { en: "Book 14-Day Retreat", zh: "预订 14天静修" },
  "hj_cta_title": { en: "Start Your Healing Journey Today", zh: "今天开始您的疗愈之旅" },
  "hj_reserve_btn": { en: "Reserve Your Spot", zh: "预留名额" },
  "hj_limited_spots": { en: "Limited spaces per retreat to ensure personalized guidance and safety.", zh: "每期名额有限，以确保个性化指导和安全。" },

  // Legal Support Page
  "ls_hero_tag": { en: "Legal Protection", zh: "法律保护" },
  "ls_hero_title": { en: "Medical Dispute Resolution & Legal Support", zh: "医疗纠纷解决与法律支持" },
  "ls_hero_desc": { en: "Navigating medical treatment abroad can be complex—especially when legal issues arise. Our Medical Legal Support service is designed to protect international patients in China by providing professional, transparent, and cross-border legal assistance, allowing you to focus entirely on recovery while we handle the rest.", zh: "在国外就医可能很复杂——尤其是当出现法律问题时。我们的医疗法律支持服务旨在通过提供专业、透明和跨境的法律援助来保护在中国的国际患者，让您专注于康复，其余的交给我们。" },
  "ls_get_consultation": { en: "Get Legal Consultation", zh: "获取法律咨询" },
  "ls_team_title": { en: "Our Legal Team", zh: "我们的法律团队" },
  "ls_team_desc": { en: "100+ experienced lawyers specializing in medical disputes", zh: "100多名专注于医疗纠纷的资深律师" },
  "ls_recover_title": { en: "Recover at Home. We Handle the Process.", zh: "在家康复。我们处理流程。" },
  "ls_recover_desc": { en: "If a dispute arises, Our team manages the entire legal process locally, coordinating with hospitals, medical institutions, and legal authorities—so you can return home and concentrate on healing.", zh: "如果发生纠纷，我们的团队将在当地管理整个法律程序，与医院、医疗机构和法律当局协调——这样您就可以回国安心养病。" },
  "ls_key_advantages": { en: "Key advantages:", zh: "核心优势：" },
  "ls_adv_1": { en: "Most of the time, there’s no need for repeated trips to China.", zh: "大多数情况下，无需多次往返中国。" },
  "ls_adv_2": { en: "Clear, bilingual communication", zh: "清晰的双语沟通" },
  "ls_adv_3": { en: "Regular progress updates", zh: "定期进度更新" },
  "ls_adv_4": { en: "Legally compliant representation within China", zh: "中国境内合规代理" },
  "ls_independent_title": { en: "Independent Legal Services — Open to All", zh: "独立法律服务 — 面向所有人" },
  "ls_independent_desc": { en: "You do not need to be an existing medical client to access our legal support.", zh: "您无需是现有医疗客户即可获得我们的法律支持。" },
  "ls_open_tag": { en: "Open to Everyone", zh: "面向所有人" },
  "ls_card_1_title": { en: "Independent Patients", zh: "独立患者" },
  "ls_card_1_desc": { en: "International patients who received treatment in China independently and need legal assistance.", zh: "在中国独立接受治疗并需要法律援助的国际患者。" },
  "ls_card_2_title": { en: "Third-Party Referrals", zh: "第三方转介" },
  "ls_card_2_desc": { en: "Patients referred by embassies, insurance companies, or other third-party organizations.", zh: "由大使馆、保险公司或其他第三方组织转介的患者。" },
  "ls_card_3_title": { en: "Family Representation", zh: "家属代理" },
  "ls_card_3_desc": { en: "Families handling disputes on behalf of patients who are unable to manage proceedings themselves.", zh: "代表无法自行处理纠纷的患者处理纠纷的家属。" },
  "ls_quote": { en: "\"Our legal services operate independently and objectively, ensuring fairness and professionalism in every case.\"", zh: "“我们的法律服务独立客观运作，确保每个案件的公平和专业。”" },
  "ls_need_support": { en: "Need Legal Support?", zh: "需要法律支持？" },
  "ls_contact_team": { en: "Contact our legal team for a free consultation", zh: "联系我们的法律团队进行免费咨询" },
  "ls_send_email": { en: "Send Email", zh: "发送邮件" },

  // Auth Pages
  "auth_login": { en: "Sign in", zh: "登录" },
  "auth_login_desc": { en: "Enter your email to sign in to your account", zh: "输入您的邮箱登录账户" },
  "auth_register": { en: "Create an account", zh: "创建账户" },
  "auth_register_desc": { en: "Enter your email below to create your account", zh: "在下方输入邮箱创建账户" },
  "auth_email": { en: "Email", zh: "邮箱" },
  "auth_password": { en: "Password", zh: "密码" },
  "auth_subscribe": { en: "Subscribe to vitacross@163.com for exclusive coupons", zh: "订阅 vitacross@163.com 获取独家优惠券" },
  "auth_create_account": { en: "Create account", zh: "创建账户" },
  "auth_or_continue": { en: "Or continue with", zh: "或继续使用" },
  "auth_no_account": { en: "Don't have an account?", zh: "还没有账户？" },
  "auth_have_account": { en: "Already have an account?", zh: "已经有账户？" },
  "auth_fill_all": { en: "Please fill in all fields", zh: "请填写所有必填项" },
  "auth_subscribe_success": { en: "Successfully subscribed to vitacross@163.com! Coupons will be sent to your email.", zh: "成功订阅 vitacross@163.com！优惠券将发送至您的邮箱。" },
  "auth_register_success": { en: "Registration successful!", zh: "注册成功！" },
  "auth_connecting": { en: "Connecting to", zh: "正在连接" },
  "auth_login_success": { en: "Logged in successfully!", zh: "登录成功！" },
  "auth_login_success_mock": { en: "Logged in successfully (Mock Mode)!", zh: "登录成功（演示模式）！" },
  "auth_name_optional": { en: "Name (Optional)", zh: "姓名（选填）" },
  "auth_agree_intro": { en: "By registering, you agree to:", zh: "注册即表示您同意：" },
  "auth_terms_privacy": { en: "Terms of Service and Privacy Policy", zh: "服务条款和隐私政策" },

  // My Account
  "account_title": { en: "My Account", zh: "我的账户" },
  "account_welcome": { en: "Welcome back", zh: "欢迎回来" },
  "account_purchase": { en: "Purchase New Service", zh: "购买新服务" },
  "account_profile_info": { en: "Profile Information", zh: "个人信息" },
  "account_profile_desc": { en: "Manage your personal information", zh: "管理您的个人信息" },
  "account_edit": { en: "Edit Profile", zh: "编辑资料" },
  "account_cancel": { en: "Cancel", zh: "取消" },
  "account_name": { en: "Name", zh: "姓名" },
  "account_phone": { en: "Phone", zh: "电话" },
  "account_phone_code": { en: "Code", zh: "区号" },
  "account_country": { en: "Country", zh: "国家" },
  "account_city": { en: "City", zh: "城市" },
  "account_address": { en: "Address", zh: "地址" },
  "account_save": { en: "Save Changes", zh: "保存更改" },
  "account_reset": { en: "Reset", zh: "重置" },
  "account_login_method": { en: "Login Method", zh: "登录方式" },
  "account_member_since": { en: "Member Since", zh: "注册时间" },
  "account_location": { en: "Location", zh: "所在地" },
  "account_not_set": { en: "Not set", zh: "未设置" },
  "account_comm_pref": { en: "Communication Preferences", zh: "通信偏好" },
  "account_comm_desc": { en: "Manage your email subscription", zh: "管理您的邮件订阅" },
  "account_sub_title": { en: "Subscribe to email updates", zh: "订阅邮件更新" },
  "account_sub_desc": { en: "Receive updates about our services and promotions via 163 email service", zh: "通过 163 邮件服务接收关于我们要服务和促销的更新" },

  // Terms
  "terms_title": { en: "Terms of Service & Privacy Policy", zh: "服务条款与隐私政策" },
  "terms_updated": { en: "Last Updated: January 2026", zh: "最后更新：2026年1月" },
  "terms_1_title": { en: "1. Acceptance of Terms", zh: "1. 条款接受" },
  "terms_1_content": { en: "By registering for an account on VitaCross (\"the Platform\"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.", zh: "在 VitaCross（“平台”）注册账户即表示您同意遵守并受这些服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。" },
  "terms_2_title": { en: "2. Privacy & Data Collection", zh: "2. 隐私与数据收集" },
  "terms_2_intro": { en: "We take your privacy seriously. We collect and use your data as follows:", zh: "我们要重视您的隐私。我们按如下方式收集和使用您的数据：" },
  "terms_2_li1": { en: "Personal Identity: We collect your name, email address, and phone number to create your account and verify your identity.", zh: "个人身份：我们要收集您的姓名、电子邮件地址和电话号码，以创建您的账户并验证您的身份。" },
  "terms_2_li2": { en: "Medical Data: Any health information, medical history, or consultation requests you provide are stored with strict encryption. This data is processed solely for the purpose of facilitating your medical travel and consultation services.", zh: "医疗数据：您提供的任何健康信息、病史或咨询请求都将严格加密存储。此数据仅用于促进您的医疗旅游和咨询服务。" },
  "terms_2_li3": { en: "Usage Data: We monitor platform usage to improve our services and ensure security.", zh: "使用数据：我们要监控平台使用情况以改进我们的服务并确保安全。" },
  "terms_3_title": { en: "3. Email Subscription & Communications", zh: "3. 邮件订阅与通信" },
  "terms_3_auto_title": { en: "Automatic Subscription Agreement", zh: "自动订阅协议" },
  "terms_3_auto_desc": { en: "By creating an account, you explicitly agree to automatically subscribe to our email newsletter and notification service (powered by 163 email service).", zh: "创建账户即表示您明确同意自动订阅我们的电子邮件通讯和通知服务（由 163 邮件服务提供）。" },
  "terms_3_intro": { en: "We send emails regarding:", zh: "我们要发送有关以下内容的电子邮件：" },
  "terms_3_li1": { en: "Account security and status updates.", zh: "账户安全和状态更新。" },
  "terms_3_li2": { en: "Consultation progress and medical reports.", zh: "咨询进度和医疗报告。" },
  "terms_3_li3": { en: "Platform news, medical travel guides, and promotional offers.", zh: "平台新闻、医疗旅游指南和促销优惠。" },
  "terms_3_out": { en: "You may unsubscribe from marketing communications at any time via the \"Settings\" page in your dashboard or by clicking the \"Unsubscribe\" link in any promotional email. Transactional emails (e.g., password resets) cannot be disabled.", zh: "您可以随时通过仪表板中的“设置”页面或点击任何促销电子邮件中的“退订”链接退订营销通信。交易电子邮件（例如密码重置）无法禁用。" },
  "terms_4_title": { en: "4. Data Sharing & Third Parties", zh: "4. 数据共享与第三方" },
  "terms_4_intro": { en: "We strictly do not sell your personal data. We may share necessary information with:", zh: "我们要严禁出售您的个人数据。我们要可能与以下方共享必要信息：" },
  "terms_4_li1": { en: "Healthcare Providers: Hospitals and doctors you choose to consult with, to provide you with medical opinions and treatment plans.", zh: "医疗保健提供者：您选择咨询的医院和医生，为您提供医疗意见和治疗方案。" },
  "terms_4_li2": { en: "Service Partners: Interpreters or travel agencies, only if you explicitly request these services.", zh: "服务合作伙伴：口译员或旅行社，仅在您明确请求这些服务时。" },
  "terms_5_title": { en: "5. Data Retention & Deletion", zh: "5. 数据保留与删除" },
  "terms_5_intro": { en: "We retain your data as long as your account is active. You have the right to:", zh: "只要您的账户处于活动状态，我们就会保留您的数据。您有权：" },
  "terms_5_li1": { en: "Access and export your personal data.", zh: "访问和导出您的个人数据。" },
  "terms_5_li2": { en: "Update or correct your information via \"My Account\".", zh: "通过“我的账户”更新或更正您的信息。" },
  "terms_5_li3": { en: "Request full account deletion. Upon deletion, all your personal and medical data will be permanently removed from our active servers, except where retention is required by law.", zh: "请求完全删除账户。删除后，您的所有个人和医疗数据将从我们的活动服务器中永久删除，除非法律要求保留。" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("vitacross_lang") as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("vitacross_lang", lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
