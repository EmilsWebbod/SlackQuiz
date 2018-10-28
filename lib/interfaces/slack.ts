export interface ISlackHandShake {
  type: 'url_verification';
  token: string;
  challenge: string;
}

export interface ISlack {
  event_id: string;
  token: string;
  team_id: string;
  api_app_id: string;
  type: string;
  event_time: string;
  authed_users: string[];
  event: {
    type: string;
    user: string;
    text: string;
    client_msg_id: string;
    ts: string;
    channel: string;
    event_ts: string;
    channel_type: string;
    subtype?: string;
  };
}
