<script setup>
definePageMeta({
  layout: 'landing',
})

</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 헤더 -->
    <div class="navbar bg-base-200">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>기능</a></li>
            <li><a>사용 방법</a></li>
            <li><a>가격</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">Feedback Hub</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>기능</a></li>
          <li><a>사용 방법</a></li>
          <li><a>가격</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <NuxtLink to="/login" class="btn btn-ghost">로그인</NuxtLink>
        <NuxtLink to="/signup" class="btn btn-primary">시작하기</NuxtLink>
      </div>
    </div>

    <!-- 히어로 섹션 -->
    <div class="hero min-h-[70vh] bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="https://picsum.photos/600/400" class="max-w-sm rounded-lg shadow-2xl" alt="Hero Image" />
        <div>
          <h1 class="text-5xl font-bold">사용자 피드백을 쉽게 관리하세요</h1>
          <p class="py-6">
            Feedback Hub로 사용자 의견을 수집하고, 우선순위를 정하고, 로드맵을 관리하세요.
            투명한 제품 개발 과정으로 사용자의 참여를 유도합니다.
          </p>
          <NuxtLink to="/p/demo" class="btn btn-primary">데모 체험하기</NuxtLink>
          <NuxtLink to="/signup" class="btn btn-outline ml-2">무료로 시작하기</NuxtLink>
        </div>
      </div>
    </div>

    <!-- 기능 섹션 -->
    <div class="py-16 px-4 md:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">주요 기능</h2>
        <p class="text-lg mt-4">사용자 피드백을 효과적으로 관리하는 데 필요한 모든 도구</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- 기능 1 -->
        <div class="card bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </figure>
          <div class="card-body items-center text-center">
            <h3 class="card-title">피드백 수집</h3>
            <p>사용자가 쉽게 피드백을 제출하고 투표할 수 있는 직관적인 인터페이스를 제공합니다.</p>
          </div>
        </div>

        <!-- 기능 2 -->
        <div class="card bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </figure>
          <div class="card-body items-center text-center">
            <h3 class="card-title">우선순위 설정</h3>
            <p>투표와 댓글을 통해 어떤 기능이 가장 필요한지 쉽게 파악하여 개발 우선순위를 결정합니다.</p>
          </div>
        </div>

        <!-- 기능 3 -->
        <div class="card bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </figure>
          <div class="card-body items-center text-center">
            <h3 class="card-title">로드맵 관리</h3>
            <p>향후 개발 계획을 공유하여 사용자에게 투명성을 제공하고 기대감을 높입니다.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용 방법 섹션 -->
    <div class="py-16 px-4 md:px-8 bg-base-200">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">간단한 3단계로 시작하세요</h2>
      </div>

      <ul class="timeline timeline-vertical max-w-4xl mx-auto">
        <li>
          <div class="timeline-start timeline-box">계정 생성</div>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-5 h-5 text-primary">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="timeline-end timeline-box">1분 이내에 무료 계정을 만들고 프로젝트를 설정하세요.</div>
        </li>
        <li>
          <div class="timeline-start timeline-box">사용자 초대</div>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-5 h-5 text-primary">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="timeline-end timeline-box">공유 링크를 통해 사용자를 초대하고 피드백을 수집하세요.</div>
        </li>
        <li>
          <div class="timeline-start timeline-box">피드백 관리</div>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-5 h-5 text-primary">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="timeline-end timeline-box">수집된 피드백에 우선순위를 설정하고 로드맵을 작성하세요.</div>
        </li>
      </ul>
    </div>

    <!-- 테스티모니얼 섹션 -->
    <div class="py-16 px-4 md:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">사용자 후기</h2>
        <p class="text-lg mt-4">실제 사용자들의 이야기를 들어보세요</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://picsum.photos/100/100?random=1" alt="Avatar" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="font-bold">박지민</h3>
                <p class="text-sm">제품 매니저, 테크스타트업</p>
              </div>
            </div>
            <p>"사용자의 의견을 체계적으로 수집하고 관리할 수 있어 제품 개발 과정이 훨씬 명확해졌습니다. 우리 팀의 필수 도구가 되었어요!"</p>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://picsum.photos/100/100?random=2" alt="Avatar" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="font-bold">정우진</h3>
                <p class="text-sm">CEO, 모바일 앱 회사</p>
              </div>
            </div>
            <p>"사용자와의 소통이 원활해지고 투명한 로드맵 관리로 고객 신뢰도가 크게 향상되었습니다. 이전에는 이런 도구가 없어서 불편했어요."</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA 섹션 -->
    <div class="py-16 px-4 md:px-8 bg-base-200 text-center">
      <h2 class="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
      <p class="text-lg mb-8 max-w-2xl mx-auto">
        사용자 피드백을 효과적으로 관리하고 제품을 개선하는 여정을 시작하세요.
        무료 계정으로 모든 기능을 체험해보세요.
      </p>
      <NuxtLink to="/signup" class="btn btn-primary btn-lg">무료로 시작하기</NuxtLink>
    </div>

    <!-- 푸터 -->
    <footer class="footer p-10 bg-base-300 text-base-content">
      <nav>
        <h6 class="footer-title">서비스</h6>
        <a class="link link-hover">기능</a>
        <a class="link link-hover">가격</a>
        <a class="link link-hover">사용 사례</a>
        <a class="link link-hover">FAQ</a>
      </nav>
      <nav>
        <h6 class="footer-title">회사</h6>
        <a class="link link-hover">소개</a>
        <a class="link link-hover">블로그</a>
        <a class="link link-hover">채용</a>
        <a class="link link-hover">연락처</a>
      </nav>
      <nav>
        <h6 class="footer-title">법적 정보</h6>
        <a class="link link-hover">이용약관</a>
        <a class="link link-hover">개인정보처리방침</a>
        <a class="link link-hover">쿠키 정책</a>
      </nav>
      <form>
        <h6 class="footer-title">뉴스레터</h6>
        <div class="form-control w-80">
          <label class="label">
            <span class="label-text">최신 업데이트 소식을 받아보세요</span>
          </label>
          <div class="join">
            <input type="email" placeholder="이메일" class="input input-bordered join-item" required />
            <button class="btn btn-primary join-item">구독</button>
          </div>
        </div>
      </form>
    </footer>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2023 - All rights reserved by Feedback Hub</p>
      </aside>
    </footer>
  </div>
</template>

<style></style>
