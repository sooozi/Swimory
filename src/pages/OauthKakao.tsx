import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OauthKakao() {
  const navigate = useNavigate();

  useEffect(() => {
  const run = async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) return;

    try {
      const res = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_KAKAO_REST_API_KEY!,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI!,
          code: code,
          client_secret: 'SfaMTXwrkTo7NbhLqmaQgqJUiZPb5MIR',
        }),
      });

      if (!res.ok) {
        console.error('❌ 토큰 요청 실패:', await res.text());
        return;
      }

      const data = await res.json();
      const accessToken = data.access_token;
      console.log('✅ Access Token:', accessToken);

      const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = await userRes.json();
      console.log('✅ 전체 user 객체:', user);

      const nickname = user.kakao_account?.profile?.nickname ?? '익명 사용자';
      const email = user.kakao_account?.email ?? '이메일 없음';

      localStorage.setItem('nickname', nickname);
      localStorage.setItem('email', email);

      // ✅ 로그인 성공 후 마이페이지로 이동
        navigate('/mypage');
    } catch (e) {
      console.error('❌ 에러 발생:', e);
    }
  };

  run();
}, []);

  return <div>카카오 로그인 중입니다...</div>;
}
