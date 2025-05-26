-- CreateIndex
CREATE INDEX "contents_releaseDate_idx" ON "contents"("releaseDate");

-- CreateIndex
CREATE INDEX "episodes_tvShowId_idx" ON "episodes"("tvShowId");

-- CreateIndex
CREATE INDEX "list_items_listId_idx" ON "list_items"("listId");

-- CreateIndex
CREATE INDEX "list_items_contentId_idx" ON "list_items"("contentId");

-- CreateIndex
CREATE INDEX "lists_userId_idx" ON "lists"("userId");

-- CreateIndex
CREATE INDEX "watch_histories_userId_idx" ON "watch_histories"("userId");

-- CreateIndex
CREATE INDEX "watch_histories_contentId_idx" ON "watch_histories"("contentId");
