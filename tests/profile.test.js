const mongoose = require("mongoose");
const profileService = require('../services/profileService')

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();
});

describe('Profile ', () => {
  it('should return all tracks', async () => {
    const tracks = await profileService.getAllTracks('656cd50c9c2d692ff554a1d6')
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('should edit track', async () => {
    await profileService.editTrack('662aaa65f340bfebceffb5ed', 'test', 'this is test')
    const track = await profileService.getTrack('662aaa65f340bfebceffb5ed')
    expect(track).toHaveProperty('trackName', 'test');
    expect(track).toHaveProperty('description', 'this is test');
  });

  it('should NOT edit track', async () => {
    await profileService.editTrack('662aaa65f340bfebceffb5ed', 'test', '')
    const track = await profileService.getTrack('662aaa65f340bfebceffb5ed')
    expect(track).toHaveProperty('trackName', 'test');
    expect(track).toHaveProperty('description', 'this is test');
  });

  it('should delete track', async () => {
    await profileService.deleteTrack('6630b8134e35b32e791cf621')
    const track = await profileService.getTrack('6630b8134e35b32e791cf621')
    expect(track).toBeNull();
  });
  
})