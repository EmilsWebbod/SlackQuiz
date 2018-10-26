export interface ISlackHandShake {
  token: string;
  challenge: string;
}

export interface ISlack {
  token: string;
  team_id: string;
  api_app_id: string;
  event: {
    type: string;
    user: string;
    text: string;
    client_msg_id: string;
    ts: string;
    channel: string;
    event_ts: string;
    channel_type: string;
  };
  type: string;
  event_id: string;
  event_time: string;
  authed_users: string[];
}
