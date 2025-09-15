<template>
  <div id="faq-view">
    <header>
      <h1>Frequently Asked <span>Questions</span></h1>
      <div class="faq-nav">
        <a class="option" href="#getting-started">Getting Started</a>
        <a class="option" href="#plans-n-pricing">Plans & Pricing</a>
        <a class="option" href="#features-n-usage">Features & Usage</a>
        <a class="option" href="#account-n-security">Account & Security</a>
      </div>
    </header>
    <section class="faq-list">
      <div class="category" id="getting-started">
        <h3>Getting Started</h3>
        <div class="question-list">
          <div
            v-for="(question, questionIndex) in gettingStartedFaqs"
            :key="question.question"
            class="question-container"
          >
            <div
              class="question-group"
              :class="{
                open: isQuestionExpanded('getting-started', questionIndex),
              }"
            >
              <div
                class="question-heading"
                role="button"
                tabindex="0"
                :aria-expanded="
                  isQuestionExpanded('getting-started', questionIndex)
                "
                :aria-controls="getAnswerId('getting-started', questionIndex)"
                @click="toggleQuestion('getting-started', questionIndex)"
                @keydown.enter.prevent="
                  toggleQuestion('getting-started', questionIndex)
                "
                @keydown.space.prevent="
                  toggleQuestion('getting-started', questionIndex)
                "
              >
                <p>{{ question.question }}</p>
                <ChevronDown
                  class="chevron"
                  :class="{
                    open: isQuestionExpanded('getting-started', questionIndex),
                  }"
                  aria-hidden="true"
                />
              </div>
              <div
                class="answer"
                :id="getAnswerId('getting-started', questionIndex)"
                v-show="isQuestionExpanded('getting-started', questionIndex)"
                :aria-hidden="
                  !isQuestionExpanded('getting-started', questionIndex)
                "
              >
                <p>{{ question.answer }}</p>
              </div>
            </div>
            <svg
              v-if="questionIndex < gettingStartedFaqs.length - 1"
              width="417"
              height="8"
              viewBox="0 0 417 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="divider"
            >
              <path
                d="M11.6779 6.16684C-1.32994 3.36434 -14.3752 0.771402 50.031 1.01603C115.467 1.26458 270.265 2.05273 415.667 2.05273"
                stroke="inherit"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="category" id="plans-n-pricing"></div>
      <div class="category" id="features-n-usage"></div>
      <div class="category" id="account-n-security"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

type FaqQuestion = {
  question: string;
  answer: string;
};

const gettingStartedFaqs: FaqQuestion[] = [
  {
    question: "What is Vaulto?",
    answer:
      "Vaulto is a secure and user-friendly platform designed to help you store, organize, and manage your digital content and ideas efficiently. Whether you're a creator, professional, or enthusiast, Vaulto provides the tools you need to keep your valuable information safe and easily accessible.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! We offer a free plan that allows you to create up to 3 vaults, each capable of holding 25 gems. This plan is perfect for individuals looking to explore our platform and manage a modest amount of content without any cost.",
  },
];

const plansPricingFaqs: FaqQuestion[] = [
  {
    question: "What’s included in the Free vs Pro plan?",
    answer:
      "The Free plan includes up to 3 vaults with 25 gems each, basic customization options, and standard support. The Pro plan offers unlimited vaults and gems, advanced personalization features, priority access to new features, and premium support.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes, we offer a special discount for students. Students can get full access to the Pro plan at a reduced price with a valid student email address.",
  },
  {
    question: "How does the Team plan work?",
    answer:
      "The Team plan is designed for groups and organizations. It allows multiple users to collaborate within shared vaults, with each user having their own account. The plan includes team management features and is billed per user.",
  },
];

const expandedQuestions = ref<Set<string>>(new Set());

const getQuestionKey = (categoryId: string, questionIndex: number) =>
  `${categoryId}-${questionIndex}`;

const getAnswerId = (categoryId: string, questionIndex: number) =>
  `answer-${categoryId}-${questionIndex}`;

const isQuestionExpanded = (categoryId: string, questionIndex: number) =>
  expandedQuestions.value.has(getQuestionKey(categoryId, questionIndex));

const toggleQuestion = (categoryId: string, questionIndex: number) => {
  const key = getQuestionKey(categoryId, questionIndex);
  const updatedExpandedQuestions = new Set(expandedQuestions.value);

  if (updatedExpandedQuestions.has(key)) {
    updatedExpandedQuestions.delete(key);
  } else {
    updatedExpandedQuestions.add(key);
  }

  expandedQuestions.value = updatedExpandedQuestions;
};
</script>

<style scoped>
#faq-view {
  display: flex;
  flex-direction: column;
  gap: var(--border-width-deco);
}

header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
  background-color: var(--color-light);
  border-radius: var(--radius-md);

  .faq-nav {
    display: flex;
    gap: var(--spacing-md);
    background-color: var(--color-secondary);
    padding: var(--spacing-xs);
    border-radius: calc(var(--radius-xs) + 0.25rem);

    .option {
      padding: var(--spacing-sm) var(--spacing-md);
      font-weight: var(--font-weight-semibold);
      background-color: transparent;
      transition: all var(--transition-base);
      border: var(--border-width-base) solid transparent;
      border-radius: var(--radius-xs);

      &:hover {
        cursor: pointer;
        border: var(--border-width-base) solid var(--color-primary);
      }
    }
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--border-width-deco);

  .category {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-2xl);
    padding: var(--spacing-2xl);
    background: var(--color-light);
    border-radius: var(--radius-md);

    h3 {
      flex: 2;
    }

    .question-list {
      display: flex;
      flex: 3;
      flex-direction: column;
      gap: var(--spacing-md);

      .question-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .divider {
        stroke: var(--color-accent);
        width: 100%;
        height: auto;
      }

      .question-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        border-radius: var(--radius-sm);

        .question-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;

          p {
            font-weight: var(--font-weight-semibold);
          }

          .chevron {
            width: var(--font-size-lg);
            height: auto;
            color: var(--color-dark-2);
            transition: transform var(--transition-base);
          }

          .chevron.open {
            transform: rotate(180deg);
          }
        }

        .answer {
          p {
            color: var(--color-dark-2);
            line-height: 1.6;
          }
        }
      }
    }
  }
}
</style>
