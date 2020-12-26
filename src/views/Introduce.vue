<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div id="introduce" class="basic-layout-main">
        <form class="base-mat">
          <div class="doc-title">애니시아</div>
          <div class="doc-desc">
            애니시아의 시작은 2007년도 테라시아(현 <a href="https://gs.saro.me" target="_blank">가리사니</a>) 마니아즈파트의 애니메이션탭 소매뉴였습니다.
            <br />시간이 지나면서 단순히 애니메이션 편성표 기능 뿐만이 아니라 자막 정보도 제공하기 시작했습니다
            <br />이렇게 애니시아라는 곳이 단지 여러분들의 원활한 애니메이션 감상을 위한 허브 사이트입니다.
          </div>

          <div class="doc-title">개발자 정보 [정렬:분류/참여]</div>

          <div class="doc-desc">
            <div><span>운영자</span></div>
            <table class="intro-table">
              <tr><th>이름</th><th>담당</th><th>관리시작</th></tr>
              <tr><th>또_탈퇴된코란</th><td><span title="단순 편성표에 자막기능을 넣고 여러 시스템을 추가하여 지금의 애니시아를 기획">기획</span>, 관리, 애니시아 서버 제공</td><td>2009</td></tr>
              <tr><th>Leon</th><td>관리 지원</td><td>2015</td></tr>
            </table>

            <div><span>개발지원</span></div>
            <table class="intro-table">
              <tr><th>이름</th><th>담당</th><th>지원기간</th></tr>
              <tr><th>Zn</th><td>애니편성표 모바일 웹버젼 개발</td><td>2015</td></tr>
              <tr><th>진실</th><td>애니편성표 iOS 버젼 개발</td><td>2014</td></tr>
              <tr><th>눅세</th><td>애니편성표 크롬 확장 프로그램</td><td>2014?</td></tr>
              <tr><th>Novang</th><td>애니편성표 크롬 확장 프로그램/윈도우 ModernUI용 프로그램 개발</td><td>2015?</td></tr>
            </table>

            <div>
              <span>관리자/개발지원 - 활동종료</span>
            </div>
            <table class="intro-table">
              <tr><th>이름</th><th>담당</th><th>활동기간</th></tr>
              <tr><th>UTPasiirs</th><td>관리 지원</td><td>2015 ~ 2018</td></tr>
              <tr><th>ORS(단체)</th><td>라디오편성표</td><td>2009 ~ 2011</td></tr>
              <tr><th>메티오</th><td>일러스트, 디자인, <span title="사이트 좌상단 날개모양이 있는 애니시아 상징마크">Anissia 마크</span></td><td>2009 ~ 2010</td></tr>
              <tr><th>Annyeong</th><td>다음위젯</td><td>2009</td></tr>
              <tr><th>Kernys</th><td>다음위젯</td><td>2009</td></tr>
              <tr><th>Reve</th><td>iOS</td><td>2007 ~ 2011</td></tr>
              <tr><th>랜스</th><td>애니편성표 프로그램</td><td>2007 ~ 2009</td></tr>
            </table>

            <div><span>가리사니 개발자공간</span>&nbsp;[<a href="https://gs.saro.me/" target="_blank">바로가기</a>]</div>
            <div style="color: #777; padding:6px 4px 8px; font-size: 13px">
              애니시아와 애니편성표를 만든단체로 2013-12-31 까지 운영<br/>
              애니시아엔 정규 개발자가 없기 때문에 간혹 기술지원은 하나 정규지원중단
            </div>
            <table class="intro-table" style="max-width:610px;">
              <tr>
                <th style="width:90px">2020 리뉴얼</th>
                <td>
                  애니 순위, 정보/권한 신청, 작성, 변경, 승인 시스템
                  <div style="font-size:11px; color:#777; line-height:1.7">
                    원래 "2019 리뉴얼" 이었으나 (2019-07-23 생성) <span title="박용서">개발자</span>의 회사 프로젝트 기간과 겹쳐 중단,
                    2019년 말부터 틈틈히 진행되었기 때문에 "2020 리뉴얼"로 개명.<br/>
                    마지막 전체(FRONT, BACK, DB)리뉴얼 이후 디자인, 시스템 개선만 진행<br/>
                    - GITHUB를 통해 전체 소스 공개 (FRONT, BACK, DDL[ORM in BACK])
                  </div>
                </td>
              </tr>
              <tr>
                <th>2015 리뉴얼</th>
                <td>
                  다음 위젯 서비스 종료로 대처할 위젯 및 편성표 모바일 대응
                  <div style="font-size:11px; color:#777; line-height:1.7">
                    프론트엔드 전체 디자인 변경, 블로그용 이미지 편성표 추가
                  </div>
                </td>
              </tr>
              <tr>
                <th>2013 리뉴얼</th>
                <td>
                  가리사니 DB에서 애니시아 분리 완전 독립화
                  <div style="font-size:11px; color:#777; line-height:1.7">
                    운영자 또탈퇴된_코란이 직접 서버비용부담, 비용문제해결로 인해 완전하게 독립됨<br/>
                    가리사니 회원데이터가 카피되었기 때문에, 개인정보 문제로 (6개월 미접속 + 비 관리자) 삭제<br/>
                    - 처음 마이그레이션시 (6개월 미접속 + 비 관리자) 삭제<br/>
                    - 이후로 약 2년간 비정기적으로 (6개월 미접속 + 비 관리자) 조건으로 삭제<br/>
                    - 6개월 비접속 외 비 관리자 조건을 넣은 것은 군대에 간 관리자들을 배려하기 위함.<br/>
                    - 더 이상 가리사니 회원이 없을 것으로 판단됨
                  </div>
                </td>
              </tr>
              <tr>
                <th>2009 개설</th>
                <td>
                  테리사아 개발자 사이트 (현 <a href="https://gs.saro.me">가리사니</a>)의 회원유치를 위해 제작됨
                  <div style="font-size:11px; color:#777; line-height:1.7">
                    애니메이션 게시판, 애니메이션 편성표 제공<br/>
                    지나친 회원유치로 개발자 사이트 정체성에 문제가 생겨 분리(애니시아)/병합을 반복<br/>
                    - 당시 서버비용 부족으로 테라시아와 재병합 하기도함.
                  </div>
                </td>
              </tr>
            </table>
            <table class="intro-table">
              <tr><th>이름</th><th>담당</th><th>정규활동기간</th></tr>
              <tr><th>박용서</th><td>개발총괄, 애니편성표, 애니시아, 시스템, API, 디자인, 기획</td><td>2007 ~ 2013, 2015, 2019 (폐기), 2020</td></tr>
              <tr>
                <th title="현재는 가리사니/애니시아 소속이 아니지만 양쪽다 비정규지원중임으로 이곳에 기재함">매디</th>
                <td>일러스트총괄, <span title="예전 윈도우 프로그램 아이콘">애니시아 아이콘</span>, <span title="`애니 편성표`라는 이름을 만듬, 이전에는 `애니 시간표`">애니편성표</span></td>
                <td>2007 ~ 2013</td></tr>
            </table>
          </div>
          <div class="doc-title">변천사</div>
          <div class="doc-desc">
            <table class="intro-table">
              <tr><th>2020-12-31</th><td>2020 리뉴얼 (지원:가리사니 개발자공간)</td></tr>
              <tr><th>2015-07-19</th><td>2015 리뉴얼 (지원:가리사니 개발자공간)</td></tr>
              <tr><th>2015-06-23</th><td>기가랜 설치, 새로운 저전력 서버로 교체</td></tr>
              <tr><th>2015-05-31</th><td>Daum위젯뱅크 서비스 종료로 새로운 위젯 서비스 시작</td></tr>
              <tr><th>2014-05-11</th><td>애니편성표 모바일 웹 버젼 등재</td></tr>
              <tr><th>2014-04-14</th><td>애니편성표 크롬 확장프로그램 등록</td></tr>
              <tr><th>2014-01-01</th><td>가리사니 -&gt; 또_탈퇴된코란 운영권 이전</td></tr>
              <tr><th>2013-12-13</th><td>구 애니편성표 API (가리사니서버 제공) 지원종료</td></tr>
              <tr><th>2013-12-03</th><td>가리사니서버 -&gt; 또_탈퇴된코란서버로 이전</td></tr>
              <tr><th>2013-12-03</th><td>애니시아 완전 독립버전 완성 - 서버이전 기초작업</td></tr>
              <tr><th>2013-12-02</th><td>애니편성표 다음 위젯 리뉴얼</td></tr>
              <tr><th>2013-11-29</th><td>신규 회원가입 개시 : 그동안 비공식적으로만 받음</td></tr>
              <tr><th>2013-11-29</th><td>애니편성표 기능 확장 및 종영애니 표시</td></tr>
              <tr><th>2013-11-29</th><td>애니시아 리뉴얼</td></tr>
              <tr><th>2013-11-29</th><td>라디오 편성표 시스템 폐기 (사실상 2011년 중단)</td></tr>
              <tr><th>2013-10-14</th><td>가리사니 개발자 공간에서 분리</td></tr>
              <tr><th>2013-10-14</th><td>애니시아와 가리사니의 회원 데이터베이스 분리</td></tr>
              <tr><th>2013-02-20</th><td>안드로이드용 애니편성표 (애니)</td></tr>
              <tr><th>2012-05-30</th><td>윈도우폰용 애니편성표 (애니)</td></tr>
              <tr><th>2011-05-11</th><td>아이폰용 애니편성표 (애니)</td></tr>
              <tr><th>2011-03-25</th><td>공식사이트 표시기능 추가 (애니)</td></tr>
              <tr><th>2011-02-18</th><td>애니위젯 폐기 (530 버전) (애니)</td></tr>
              <tr><th>2010-10-03</th><td>관리시스템 자동화 (애니/라디오)</td></tr>
              <tr><th>2010-10-03</th><td>서버문제로 가리사니에 재병합 (애니/라디오)</td></tr>
              <tr><th>2010-10-03</th><td>테라시아 -&gt; 가리사니 이름 변경</td></tr>
              <tr><th>2009-12-04</th><td>애니위젯 등록 (625 버전) (애니)</td></tr>
              <tr><th>2009-09-29</th><td>애니위젯 등록 (530 버전 / 현재폐기됨) (애니)</td></tr>
              <tr><th>2009-09-28</th><td>자막제작자분이 직접 수정가능 (애니)</td></tr>
              <tr><th>2009-09-11</th><td>테라시아로부터 애니시아 독립 (애니/라디오)</td></tr>
              <tr><th>2009-08-17</th><td>라디오 편성표 탄생 (라디오)</td></tr>
              <tr><th>2009-08-17</th><td>비정규/신작표시시작 (애니)</td></tr>
              <tr><th>2009-07-03</th><td>자막제작자 표시 (애니)</td></tr>
              <tr><th>2009-06-21</th><td>테라시아의 이름을 따서 <span title="또_탈퇴된코란 소유">anissia.net</span> 도메인 선점</td></tr>
              <tr><th>2009-06-21</th><td>애니규모가 커짐에따라 테라시아 개발자 포럼의 정체성 문제로 분리 논의</td></tr>
              <tr><th>2009-03-14</th><td>애니편성표 시범시작 (애니)</td></tr>
              <tr><th>2007-02-22</th><td>테라시아 마니아즈파트의 애니메이션탭 소매뉴 생성 : 현 애니시아의 전신</td></tr>
              <tr><th>2007-02-22</th><td>테라시아 개발자 포럼(현:가리사니 개발자 공간) 개시</td></tr>
              <tr><th>2007-02-22</th><td>클라비스 -&gt; 테라시아 이름변경 후 도메인(terassia.com) 구입 서비스 개시</td></tr>
            </table>

            <div class="doc-title">갤러리</div>
            <div class="gallery">
              <div v-for="node in gallery" :key="node.name" :style="`background-image: url('${require('@/assets/page/introduce-' + node.file)}')`" :title="node.desc" ></div>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    AnimeRank
  },
  methods: {

  }
})

export default class Introduce extends Vue {
  data() {
    return {
      gallery: [
        { file: 'timetable.1.jpg', desc: `최초의 애니편성표 [2009년]: 애니시간표 -> 애니편성표 (기존 애니시간표는 자료소실)` },
        { file: 'timetable.2.jpg', desc: `두번째 애니편성표 [2009년]: 이 디자인을 선호하는 사람이 많아 현재도 제공중` },
        { file: 'timetable.3.jpg', desc: `세번째 애니편성표 [2015년]: 2020년에 다크모드가 추가됨` },
        { file: 'timetable-radio.jpg', desc: `라디오 편성표 [2009년]: ` },
        { file: 'timetable-widget.1.jpg', desc: `최초의 애니편성표 위젯 [2009년 1차]: 스크린샷이 없어 소스로 복원 [내용부분이 다를 수 있음]` },
        { file: 'timetable-widget.2.jpg', desc: `애니편성표 위젯 [2009년 2차]: 여러가지 배경 태마가 있음` },
        { file: 'timetable-widget.3.jpg', desc: `애니편성표 위젯 [2009년 3차]: 각각의 색상을 바꿀 수 있음.` },
        { file: 'timetable-widget.4.jpg', desc: `애니편성표 위젯 [2015년]: HTML 태그를 지원하지 않는 곳을 위한 이미지 전용으로 퀄리티는 다소 떨어짐` },
        { file: 'other.1.jpg', desc: `애니편성표 2009년 버전의 드로잉 [작업자: 매디]` },
        { file: 'anissia.1.jpg', desc: `테라시아 (현: 가리사니) [2007년] 애니시아는 원래 개발자 사이트인 테라시아를 홍보하기 위해 만들어진 소메뉴였다.` },
        { file: 'anissia.2.jpg', desc: `애니시아 디자인도안 [작업자: 메티오]: 애니시아 분리독립을 위해 만들어진 도안중 하나` },
        { file: 'anissia.3.jpg', desc: `애니시아 디자인도안 [작업자: 메티오]: 기획을 지나치게 크게 잡았다가 개발시간이 부족하여 무산됨, 시간이지나 리뉴얼시에 해당그림의 "Anissia 마크"를 발견하여 현재는 애니시아의 상징적인 마크가됨` },
        { file: 'anissia.4.jpg', desc: `애니시아 1차: 결국 Anissia 마크만 가져와서 제작` },
        { file: 'anissia.5.jpg', desc: `애니시아 2차 2015년` },
        { file: 'anissia.6.jpg', desc: `애니시아 2차 2019년` }
      ]
    };
  }
}
</script>

<style>
#introduce { font-family: "Malgun Gothic", "Dotum"; }
#introduce .base-mat { padding:8px; }
#introduce .doc-title {
  font-size: 20px;
  border-bottom: 1px solid #276998;
  color: #276998;
  padding: 6px 8px 8px;
}
#introduce .doc-desc { padding: 12px 8px; line-height: 1.8; margin-bottom: 8px }
#introduce table.intro-table { margin:4px 0 20px; }
#introduce table.intro-table th { color:#2a4c8c }
#introduce table.intro-table th, #introduce table.intro-table td { padding:4px 12px; font-weight: normal }
#introduce table.intro-table, #introduce table.intro-table th, #introduce table.intro-table td { border:1px solid #dde1e6; }

#introduce .gallery { padding-top:12px; display: flex; justify-content: flex-start; flex-flow: row wrap; }
#introduce .gallery div {
  min-height: 160px; background-repeat: no-repeat; background-size: contain; background-position: center; flex: 0 0 30%; margin: 30px 1%;
  filter: grayscale(.1); opacity: .6; transition: all .2s;
}
#introduce .gallery div:hover { filter: grayscale(0); opacity: 1; }

@media (max-width: 500px) {
  #introduce .gallery div { flex: 0 0 48%; min-height: 120px; }
}
</style>
