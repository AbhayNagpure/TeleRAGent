const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

const responsesByMode = {
  qna: {
    answer:
      'According to the 3GPP service requirements, URLLC focuses on ultra-low latency and very high reliability. For industrial use cases, throughput depends on deployment profile and device density, but the relevant specification family calls out bounded latency, reliability targets, and service continuity as the key constraints.',
    sources: [
      { label: '3GPP Rel.16 §5.3.2', ref: '3gpp-rel16-5.3.2' },
      { label: 'TeleQnA #142', ref: 'teleqna-142' },
    ],
  },
  rca: {
    answer:
      'Root cause analysis:\n1. The initial symptom points to degraded transport between the DU and CU control path.\n2. O-RAN logs indicate repeated session retries during the affected window.\n3. The most likely cause is instability in the midhaul path, causing intermittent signaling failures and downstream throughput drops.\n4. Recommended next step: verify DU-CU link counters, timing drift, and recent transport configuration changes.',
    sources: [
      { label: 'O-RAN Log #A21', ref: 'oran-log-a21' },
      { label: '3GPP TS 38.401', ref: '3gpp-ts-38.401' },
    ],
  },
  anomaly: {
    answer:
      'Anomaly flagged: the latest KPI pattern shows an unusual rise in PRB utilization with a simultaneous dip in user throughput. This combination suggests congestion, scheduler imbalance, or a localized radio quality issue. Compare the affected cell against the baseline window before escalating.',
    sources: [
      { label: 'RAN KPI Log', ref: 'ran-kpi-log' },
      { label: 'O-RAN Benchmark', ref: 'oran-benchmark' },
    ],
  },
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: 'Mistral-7B + LoRA' });
});

app.post('/api/query', (req, res) => {
  const { message, mode, top_k, temperature } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!Object.prototype.hasOwnProperty.call(responsesByMode, mode)) {
    return res.status(400).json({ error: 'Invalid mode' });
  }

  if (typeof top_k !== 'number' || typeof temperature !== 'number') {
    return res.status(400).json({ error: 'top_k and temperature must be numbers' });
  }

  const response = responsesByMode[mode];

  res.json({
    answer: response.answer,
    sources: response.sources,
    mode,
  });
});

app.delete('/api/chat/clear', (_req, res) => {
  res.json({ status: 'cleared' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
