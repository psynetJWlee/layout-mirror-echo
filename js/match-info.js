function renderMatchInfo() {
  const html = `
    <section class="match-info">
      <div class="team home-team">
        <img src="/image/Group 1048.png" alt="맨체스터C" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #BB2828;"></div>
          <div class="team-name">맨체스터C</div>
        </div>
      </div>
      <div class="vs-text">VS</div>
      <div class="team away-team">
        <img src="/image/team logo.png" alt="맨체스터U" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #1E3384;"></div>
          <div class="team-name">맨체스터U</div>
        </div>
      </div>
    </section>
  `;
  $('#app').append(html);
} 