export interface KeyCodeInter {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HistoryInter {
  id: number;
  visitor_id: string;
  code: string;
  url: string;
  title: string;
  ip: string;
  region: string;
  referrer: string;
  visit_time: string;
  close_time: string;
  visit_duration: number;
  user_agent: string;
}
