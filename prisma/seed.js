/**
 * Seeds the database with operational_health questions so that
 * user_responses can reference them (FK user_responses_question_id_fkey).
 * IDs (q1..q10) must match OPERATIONAL_HEALTH_QUESTIONS in src/lib/calculators/operational-health.ts
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OPERATIONAL_HEALTH_QUESTIONS = [
  { id: 'q1', text: 'How frequently do your projects or tasks complete on schedule?', g2pIndex: 'PAR', sequenceOrder: 1 },
  { id: 'q2', text: 'How fast can your team adapt plans in case of unforeseen issues?', g2pIndex: 'PAR', sequenceOrder: 2 },
  { id: 'q3', text: 'What level of decision-making authority do teams have without management approval?', g2pIndex: 'AQ', sequenceOrder: 3 },
  { id: 'q4', text: 'How well can teams resolve day-to-day operational problems independently?', g2pIndex: 'AQ', sequenceOrder: 4 },
  { id: 'q5', text: 'How often are decision-makers overwhelmed by information complexity?', g2pIndex: 'CLS', sequenceOrder: 5 },
  { id: 'q6', text: 'Are your operational dashboards and metrics easy to interpret?', g2pIndex: 'CLS', sequenceOrder: 6 },
  { id: 'q7', text: 'How fast does your organization incorporate feedback into improvements?', g2pIndex: 'LV', sequenceOrder: 7 },
  { id: 'q8', text: 'How often do you run formal retrospectives or process reviews?', g2pIndex: 'LV', sequenceOrder: 8 },
  { id: 'q9', text: 'How frequently are operational issues detected and resolved automatically without manual help?', g2pIndex: 'MTTAR', sequenceOrder: 9 },
  { id: 'q10', text: 'What is the average time taken to resolve recurring operational problems?', g2pIndex: 'MTTAR', sequenceOrder: 10 },
];

async function main() {
  for (const q of OPERATIONAL_HEALTH_QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      create: {
        id: q.id,
        calculatorType: 'operational_health',
        text: q.text,
        g2pIndex: q.g2pIndex,
        sequenceOrder: q.sequenceOrder,
        questionType: 'multiple_choice',
      },
      update: {
        text: q.text,
        g2pIndex: q.g2pIndex,
        sequenceOrder: q.sequenceOrder,
      },
    });
  }
  console.log('Seeded', OPERATIONAL_HEALTH_QUESTIONS.length, 'operational_health questions (q1–q10).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
