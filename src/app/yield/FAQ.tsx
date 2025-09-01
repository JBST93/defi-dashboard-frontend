import React, { useState, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: FAQItem[];
}

export default function FAQ({ faqData }: FAQProps) {
  return (
    <section className="mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-b-0"
          >
            <dt className="font-semibold text-lg mb-3 text-gray-900">
              {item.question}
            </dt>
            <dd className="text-gray-600 leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
