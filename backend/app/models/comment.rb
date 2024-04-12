# Comment model
class Comment < ApplicationRecord
  belongs_to :feature

  validates :body, presence: true
  validates :body, length: { minimum: 10 }
end
