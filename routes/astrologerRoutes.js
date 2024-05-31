import express from 'express';
import * as astrologerController from "../controllers/astrologerController.js";

const router = express.Router();

router.post('/get_splash', astrologerController.getSplash);
router.post('/add-astrologer-inquiry', astrologerController.addAstrologerInquiry);
router.get('/get-astrologer-inquiry', astrologerController.getAllAstrologerInquiry);

router.post('/astrologer_login', astrologerController.astrologerLogin);
router.post('/verify-astrologer', astrologerController.verifyAstrologer);
router.post('/astrologer_google_login', astrologerController.astrologerGoogleLogin);

router.post('/get-astrologer-details', astrologerController.getAstrologerDetail);
router.get('/get-all-astrologers', astrologerController.getAllAstrologer);
router.post('/get_active_astrologer', astrologerController.getActiveAstrologer)

router.post('/astrologer-wallet-balance', astrologerController.astrologersWalletBalance);

router.post('/get-average-rating', astrologerController.getAverageRating);
router.post('/astrologers-review-count', astrologerController.countCustomersWithReviews);
// router.get('/recommended-astrologer', astrologerController.recommendedAstrologers);

// router.post('/start-chat', astrologerController.startChat);
// router.post('/end-chat', astrologerController.endChat);

router.get('/online-astrologer', astrologerController.getOnlineAstrologers);
router.get('/live-astrologer', astrologerController.getLiveAstrologers);
router.post('/set-astrologer-online', astrologerController.setAstrologerOnline);

router.post('/astrologers-chat-history', astrologerController.chatHistoryOfAstrologer);

// router.put('/update-astrologer-details/:id', astrologerController.updateAstrologerDetails);
router.post('/update-astrologer-details', astrologerController.updateAstrologerDetails);
router.post('/add-bank-account', astrologerController.addBankAccount);
router.post('/update-chat-price', astrologerController.updateChatPrice);
router.post('/update-call-price', astrologerController.updateCallPrice);

router.post('/logout-astrologer', astrologerController.logoutAstrologer);

router.post('/add-ongoing-chat', astrologerController.addOngoingChat);
router.get('/get-all-ongoing-chat-list', astrologerController.getAllOngoingChats);
router.post('/get-ongoing-chat', astrologerController.getOngoingChatById);
router.delete('/delete-ongoing-chat/:chatId', astrologerController.deleteOngoingChatById);
// router.put('/update-ongoing-chat/:chatId', astrologerController.updateOngoingChatById);

router.post('/add-waiting-list', astrologerController.addToWaitingList);
router.get('/get-all-waiting-list', astrologerController.getAllWaitingListEntries);
router.post('/get-waiting-list', astrologerController.getWaitingListByIdFromBody);
router.delete('/delete-waiting-list/:waitingListId', astrologerController.deleteFromWaitingList);
// router.put('/update-waiting-list/:waitingListId', astrologerController.updateWaitingListEntry);

router.post('/update-astrologer-profile-image', astrologerController.updateAstrologerProfileImage);
// router.post('/get-amount-transaction-details', astrologerController.getAmountTransactionDetails);

router.get('/get-all-verified-astrologers', astrologerController.getAllVerifiedAstrologers);
router.post('/verify-astrologer-profile', astrologerController.verifyAstrologerProfile);
router.post('/change-astrologer-status', astrologerController.changeAstrologerStatus);
router.post('/check-chat-status', astrologerController.checkChatStatus);
router.post('/check-call-status', astrologerController.checkCallStatus);
router.post('/change-chat-status', astrologerController.changeChatStatus);
router.post('/change-call-status', astrologerController.changeCallStatus);
router.post('/change-preffer-days', astrologerController.changePrefferDays);
router.post('/change-preffer-time', astrologerController.changePrefferTime);

// Notifiction
router.post('/send-notification-to-astrologer', astrologerController.sendNotificationToAstrologer);
router.get('/get-recommended-astrologers', astrologerController.getRecommededAstrologers);
router.post('/call-notification-to-astrologer', astrologerController.callNotificationToAstrologer);

router.post('/check-call-chat-status', astrologerController.checkCallChatStatus);


router.post('/astrologer-call-history', astrologerController.CallHistoryOfAstrologer);
router.post('/all_call_history_of_astrologer', astrologerController.AllCallHistoryOfAstrologer)
router.post('/check-astrologer-wallet', astrologerController.checkAstrologerWallet);
router.get('/get-enquired-astrologer', astrologerController.getEnquiredAstrologer);
router.post('/change_enquiry_status', astrologerController.changeEnquiryStatus);
router.post('/get-astrologer-call-chat-count', astrologerController.getastrologerCallChatCount)

router.get('/astrologer_home_banner', astrologerController.astrologerHomeBanner)
router.post('/request_update_service_charges', astrologerController.requestUpdateServiceCharges)
router.post('/update_basic_profile', astrologerController.updateBasicProfile)
router.post('/update_bank_profile', astrologerController.updateBankProfile)
router.post('/update_kyc_detailes', astrologerController.updateKycDetailes)

router.post('/update_chat_notification_status', astrologerController.updateChatNotificationStatus)
router.post('/update_call_notification_status', astrologerController.updateCallNotificationStatus)
router.post('/update_live_notification_status', astrologerController.updateLiveNotificationStatus)


export default router