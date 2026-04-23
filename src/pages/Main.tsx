import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Link from 'next/link';

const BookList = dynamic(() => import('./BookList'), { ssr: false });

function ErrorFallback({ error, resetErrorBoundary }: any) {
  const message = error.response?.data?.message || "알 수 없는 에러가 발생했습니다.";
  return (
    <div className='error-wrapper'>
      <h2>문제가 발생했습니다.</h2>
      <p style={{ color: 'red' }}>{message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
      {/* 여기에 로그인 페이지 이동 버튼 등을 추가 */}
    </div>
  )
}
const ListSkeleton = () => {
  return (<div className="skeleton-wrapper">
    <div style={{ width: '500px', height: '100px', backgroundColor: 'gray' }}></div>
  </div>)
}
export default function Home() {


  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ListSkeleton />}>
            <div>HOME <Link href="/CreateForm">새글</Link>
              <BookList />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>

  )
}
