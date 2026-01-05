
export interface UserProgress {
  journeyId: string;
  sectionId: string;
  completedNodes: number[];
  lastScore: number;
}

export interface UserProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  collegeAr: string;
  collegeEn: string;
  levelAr: string;
  levelEn: string;
  gpa: string;
  credits: string;
  email: string;
  isLoggedIn: boolean;
}

class SanadDB {
  private STORAGE_KEY = 'sanad_portal_db';

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      this.seed();
    }
  }

  private seed() {
    const initialData = {
      currentUser: '441002345',
      users: {
        '441002345': {
          id: '441002345',
          nameAr: 'أحمد بن عبدالله العتيبي',
          nameEn: 'Ahmed Abdullah Al-Otaibi',
          collegeAr: 'كلية الطب والجراحة',
          collegeEn: 'College of Medicine & Surgery',
          levelAr: 'المستوى الثامن',
          levelEn: 'Level 8',
          gpa: '4.85',
          credits: '128',
          email: 'a.otaibi@univ.edu.sa',
          isLoggedIn: true // Simulated logged in state
        }
      },
      progress: [] as UserProgress[],
      notifications: [
        { id: '1', titleAr: 'موعد اختبار منتصف الفصل', titleEn: 'Midterm Exam Date', date: '25 Oct 2023', type: 'urgent' },
        { id: '2', titleAr: 'تحديث السجل الأكاديمي', titleEn: 'Transcript Updated', date: '20 Oct 2023', type: 'info' }
      ]
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
  }

  private getData() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  private saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  isUserLoggedIn(): boolean {
    const user = this.getCurrentUser();
    return user?.isLoggedIn || false;
  }

  getCurrentUser(): UserProfile | null {
    const data = this.getData();
    return data.users[data.currentUser] || null;
  }

  logout() {
    const data = this.getData();
    if (data.users[data.currentUser]) {
        data.users[data.currentUser].isLoggedIn = false;
    }
    this.saveData(data);
  }

  login(id: string) {
    const data = this.getData();
    if (data.users[id]) {
        data.users[id].isLoggedIn = true;
        data.currentUser = id;
    }
    this.saveData(data);
  }

  getProgress(journeyId: string, sectionId: string): UserProgress {
    const data = this.getData();
    const existing = data.progress.find((p: any) => p.journeyId === journeyId && p.sectionId === sectionId);
    return existing || { journeyId, sectionId, completedNodes: [], lastScore: 0 };
  }

  saveProgress(journeyId: string, sectionId: string, nodeId: number, score: number) {
    const data = this.getData();
    let entry = data.progress.find((p: any) => p.journeyId === journeyId && p.sectionId === sectionId);
    
    if (!entry) {
      entry = { journeyId, sectionId, completedNodes: [nodeId], lastScore: score };
      data.progress.push(entry);
    } else {
      if (!entry.completedNodes.includes(nodeId)) {
        entry.completedNodes.push(nodeId);
      }
      entry.lastScore = score;
    }
    this.saveData(data);
  }

  getNotifications() {
    return this.getData().notifications;
  }

  getTotalCompletedSteps(): number {
    const data = this.getData();
    return data.progress.reduce((acc: number, curr: UserProgress) => acc + curr.completedNodes.length, 0);
  }
}

export const db = new SanadDB();
