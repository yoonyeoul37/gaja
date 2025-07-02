"use client"

import React, { useState } from 'react';

const faqs = [
  {
    question: '광고비는 얼마인가요?',
    answer: '광고비는 월 정액제로 운영됩니다.\n- 메인 배너 광고: 월 20만원\n- 커뮤니티 상단 광고: 월 10만원\n- 리스트 상단 광고: 월 8만원\n(모든 금액은 VAT 별도입니다.)',
  },
  {
    question: '광고 결제는 어떻게 하나요?',
    answer: '광고 신청 후 안내되는 계좌로 입금 또는 카드 결제가 가능합니다. 결제 확인 후 광고가 노출됩니다.',
  },
  {
    question: '광고 노출 기간은 어떻게 되나요?',
    answer: '광고는 결제일 기준 1개월(30일) 동안 노출됩니다. 연장 신청도 가능합니다.',
  },
  {
    question: '환불/변경이 가능한가요?',
    answer: '광고 노출 전에는 전액 환불이 가능하며, 노출 시작 후에는 환불이 어렵습니다. 일정 변경은 노출 전까지 가능합니다.',
  },
  {
    question: '광고 신청은 어디서 하나요?',
    answer: '아래 문의 연락처로 신청해주시면 담당자가 안내해드립니다.',
  },
  {
    question: '기타 문의는 어떻게 하나요?',
    answer: '이메일 또는 카카오톡으로 언제든 문의해 주세요.\n- 이메일: ads@gajagosiwon.com\n- 카카오톡: @가자고시원광고',
  },
];

export default function AdsInfoPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">광고비 안내</h1>
      <p className="text-accent-700 mb-8 text-center">
        가자고시원 플랫폼에 광고를 원하시는 사업주님을 위한 월 정액제 광고 안내입니다.<br />
        아래 FAQ를 참고해 주세요.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg bg-white shadow-sm">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-medium text-accent-800">{faq.question}</span>
              <span>{openIndex === idx ? '▲' : '▼'}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-accent-700 whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-accent-700">
        <div className="font-semibold mb-2">문의</div>
        <div>이메일: <a href="mailto:ads@gajagosiwon.com" className="text-accent-500 underline">ads@gajagosiwon.com</a></div>
        <div>카카오톡: <span className="text-accent-500">@가자고시원광고</span></div>
      </div>
    </div>
  );
} 