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
    <section className="mt-8 retro-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-brown-900">
        Frequently Asked Questions
      </h2>
      <dl>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-6"
          >
            <dt className="font-semibold text-lg mb-2">{item.question}</dt>
            <dd className="ml-4">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
