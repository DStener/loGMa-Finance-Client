<template>
  <div class="top-participants">
    <h1 class="title">Топ участников</h1>
    <div class="filters">
      <select v-model="selectedCategory">
        <option>Все категории</option>
        <option>Категория 1</option>
        <option>Категория 2</option>
      </select>
      <select v-model="selectedParticipants">
        <option>Все участники</option>
        <option>Участник 1</option>
        <option>Участник 2</option>
      </select>
    </div>
    <ul class="participants-list">
      <li v-for="participant in participants" :key="participant.id" class="participant">
        <span class="initials">{{ participant.initials }}</span>
        <div class="details">
          <span class="name">{{ participant.name }}</span>
          <span class="score">{{ participant.score }} Р</span>
          <span class="percentage">{{ participant.percentage }} от общих</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      selectedParticipants: '',
      participants: [
        { id: 1, initials: 'ИИ', name: 'Иван Иванов', score: 8200 },
        { id: 2, initials: 'МИ', name: 'Мария Иванова', score: 3150 },
        { id: 3, initials: 'АИ', name: 'Алексей Иванов', score: 1100 },
      ],
    };
  },
};
</script>

<style>
.top-participants {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  color: #2b2b2b;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.participants-list {
  list-style: none;
  padding: 0;
}

.participant {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.participant:last-child {
  border-bottom: none;
}

.initials {
  background-color: #4caf50;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.details {
  flex-grow: 1;
}

.name {
  font-weight: bold;
}

.score, .percentage {
  font-size: 14px;
  color: #6c757d;
}
</style>
