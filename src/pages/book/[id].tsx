
import { Suspense, useState } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import ReadBook from '../ReadBook';
import EditForm from '../EditForm';

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

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isEditMode, setIsEditMode] = useState(false);

  // id가 없으면 아예 아무것도 하지 않음
  if (!id) return null;

  return (
    <div>
      {isEditMode ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<BookSkeleton />}>
                <EditForm id={id} onCancel={() => setIsEditMode(false)} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<BookSkeleton />}>
                <ReadBook id={id} onEdit={() => setIsEditMode(true)} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      )}
    </div>
  );
}
const BookSkeleton = () => {
  return (<div className="skeleton-wrapper">
    <div style={{ width: '100px', height: '30px', backgroundColor: 'red' }}></div>
    <div style={{ width: '100px', height: '30px', backgroundColor: 'blue', marginTop: '10px' }}></div>
    <div style={{ width: '100px', height: "30px", backgroundColor: 'green', marginTop: '20px' }}></div>
  </div>)
}