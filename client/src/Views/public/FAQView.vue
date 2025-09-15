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
      <div
        v-for="category in faqCategories"
        :key="category.id"
        class="category"
        :id="category.id"
      >
        <h3>{{ category.title }}</h3>
        <div class="question-list">
          <div
            v-for="(question, questionIndex) in category.questions"
            :key="`${category.id}-${questionIndex}`"
            class="question-container"
          >
            <div
              class="question-group"
              :class="{
                open: isQuestionExpanded(category.id, questionIndex),
              }"
            >
              <div
                class="question-heading"
                role="button"
                tabindex="0"
                :aria-expanded="
                  isQuestionExpanded(category.id, questionIndex)
                "
                :aria-controls="getAnswerId(category.id, questionIndex)"
                @click="toggleQuestion(category.id, questionIndex)"
                @keydown.enter.prevent="
                  toggleQuestion(category.id, questionIndex)
                "
                @keydown.space.prevent="
                  toggleQuestion(category.id, questionIndex)
                "
              >
                <p>{{ question.question }}</p>
                <ChevronDown
                  class="chevron"
                  :class="{
                    open: isQuestionExpanded(category.id, questionIndex),
                  }"
                  aria-hidden="true"
                />
              </div>
              <Transition name="answer">
                <div
                  v-show="isQuestionExpanded(category.id, questionIndex)"
                  class="answer"
                  :id="getAnswerId(category.id, questionIndex)"
                  :aria-hidden="
                    !isQuestionExpanded(category.id, questionIndex)
                  "
                >
                  <p>{{ question.answer }}</p>
                </div>
              </Transition>
            </div>
            <svg
              v-if="questionIndex < category.questions.length - 1"
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

type FaqCategory = {
  id: string;
  title: string;
  questions: FaqQuestion[];
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

const featuresUsageFaqs: FaqQuestion[] = [
  {
    question: "What's a vault?",
    answer:
      "A vault is a dedicated workspace where you can group related gems together. Use them to separate personal ideas, team projects, or any collection you want to keep organized and easy to browse.",
  },
  {
    question: "What's a gem?",
    answer:
      "Gems are the individual pieces of content you save in Vaulto—notes, links, media, or inspiration. Each gem can include rich context so you always remember why it matters.",
  },
  {
    question: "Can I customize how I organize my gems?",
    answer:
      "Absolutely! Arrange gems with tags, reorder them with drag-and-drop, and highlight your favorites so every vault reflects the way you think and work best.",
  },
];

const accountSecurityFaqs: FaqQuestion[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade at any time from your billing settings, and the change takes effect immediately with a prorated charge.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes, your vaults are private by default, with sharing options coming soon.",
  },
  {
    question: "Can I export my gems?",
    answer:
      "You can export your gems whenever you need to—download them as a tidy bundle from your account settings to back up or repurpose elsewhere.",
  },
];

const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    questions: gettingStartedFaqs,
  },
  {
    id: "plans-n-pricing",
    title: "Plans & Pricing",
    questions: plansPricingFaqs,
  },
  {
    id: "features-n-usage",
    title: "Features & Usage",
    questions: featuresUsageFaqs,
  },
  {
    id: "account-n-security",
    title: "Account & Security",
    questions: accountSecurityFaqs,
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
          overflow: hidden;

          p {
            color: var(--color-dark-2);
            line-height: 1.6;
          }
        }
      }
    }
  }
}

.answer-enter-active,
.answer-leave-active {
  transition: max-height var(--transition-base), opacity var(--transition-base),
    transform var(--transition-base);
}

.answer-enter-from,
.answer-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-0.5rem);
}

.answer-enter-to,
.answer-leave-from {
  max-height: 20rem;
  opacity: 1;
  transform: translateY(0);
}
</style>
