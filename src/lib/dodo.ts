// src/lib/dodo.ts
// Dodo Payments 추상화 레이어
// DODO_API_KEY가 없으면 MOCK_MODE로 동작 (개발/테스트용)
// API 키 준비 후 TODO 주석 부분을 실제 엔드포인트로 교체하면 됨

const DODO_API_KEY = process.env.DODO_API_KEY
const DODO_WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET

export interface CheckoutParams {
  amount: number
  metadata: Record<string, string | number | boolean>
  successUrl: string
  cancelUrl: string
}

export interface CheckoutResult {
  checkoutUrl: string
  sessionId: string
}

function generateMockId(): string {
  return "mock_" + Math.random().toString(36).substring(2, 15)
}

export async function createCheckoutSession(
  params: CheckoutParams
): Promise<CheckoutResult> {
  if (!DODO_API_KEY) {
    // MOCK_MODE: API 키 없을 때 가짜 체크아웃 URL 반환
    const sessionId = generateMockId()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    return {
      checkoutUrl: `${appUrl}/payments/mock-checkout?session=${sessionId}&amount=${params.amount}`,
      sessionId,
    }
  }

  // TODO: Dodo 공식 문서 확인 후 정확한 엔드포인트로 교체
  // 현재는 합리적인 형태로 작성된 플레이스홀더
  const response = await fetch("https://api.dodopayments.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DODO_API_KEY}`,
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: "KRW",
      metadata: params.metadata,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Dodo API 오류: ${response.status} — ${errorBody}`)
  }

  const data = await response.json()

  return {
    checkoutUrl: data.checkout_url,
    sessionId: data.session_id,
  }
}

export async function verifyWebhookSignature(
  payload: string,
  signature: string
): Promise<boolean> {
  if (!DODO_API_KEY || !DODO_WEBHOOK_SECRET) {
    // MOCK_MODE: 서명 검증 건너뜀
    return true
  }

  // TODO: Dodo 공식 문서의 Webhook 서명 검증 방식으로 교체
  // 일반적으로 HMAC-SHA256 방식을 사용:
  // const expectedSignature = crypto
  //   .createHmac("sha256", DODO_WEBHOOK_SECRET)
  //   .update(payload)
  //   .digest("hex")
  // return crypto.timingSafeEqual(
  //   Buffer.from(signature),
  //   Buffer.from(expectedSignature)
  // )

  // 임시: 서명이 있으면 통과
  return Boolean(signature)
}
