<script setup>
definePageMeta({
  layout: 'admin',
})
</script>
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">프로젝트 상세</h1>
    <div role="tablist" class="tabs mb-8">
      <NuxtLink to="/admin/p/123124" role="tab" class="tab">피드백</NuxtLink>
      <NuxtLink to="/admin/p/123124/changelogs" role="tab" class="tab tab-active">변경이력</NuxtLink>
      <NuxtLink to="/admin/p/123124/setting" role="tab" class="tab">설정</NuxtLink>
    </div>
    <div class="overflow-x-auto outline outline-slate-300 rounded-xl p-4">
      <table class="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th>상태</th>
            <th>제목</th>
            <th>요약</th>
            <th>투표수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>
              <select class="select select-ghost select-xs">
                <option>미처리</option>
                <option>계획</option>
                <option>진행중</option>
                <option>완료</option>
                <option>배포됨</option>
              </select>
            </td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>12/16/2020</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>12/5/2020</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>8/15/2020</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Marjy Ferencz</td>
            <td>Office Assistant I</td>
            <td>Rowe-Schoen</td>
            <td>3/25/2021</td>
            <td>Crimson</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Yancy Tear</td>
            <td>Community Outreach Specialist</td>
            <td>Wyman-Ledner</td>
            <td>5/22/2020</td>
            <td>Indigo</td>
          </tr>
          <tr>
            <th>6</th>
            <td>Irma Vasilik</td>
            <td>Editor</td>
            <td>Wiza, Bins and Emard</td>
            <td>12/8/2020</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>7</th>
            <td>Meghann Durtnal</td>
            <td>Staff Accountant IV</td>
            <td>Schuster-Schimmel</td>
            <td>2/17/2021</td>
            <td>Yellow</td>
          </tr>
          <tr>
            <th>8</th>
            <td>Sammy Seston</td>
            <td>Accountant I</td>
            <td>O'Hara, Welch and Keebler</td>
            <td>5/23/2020</td>
            <td>Crimson</td>
          </tr>
          <tr>
            <th>9</th>
            <td>Lesya Tinham</td>
            <td>Safety Technician IV</td>
            <td>Turner-Kuhlman</td>
            <td>2/21/2021</td>
            <td>Maroon</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 flex justify-start">
      <div class="join grid grid-cols-2">
        <button class="join-item btn btn-outline">이전</button>
        <button class="join-item btn btn-outline">다음</button>
      </div>
    </div>
  </div>
</template>
<style></style>
