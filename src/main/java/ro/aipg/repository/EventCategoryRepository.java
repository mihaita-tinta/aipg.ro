package ro.aipg.repository;

import ro.aipg.domain.EventCategory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EventCategory entity.
 */
@SuppressWarnings("unused")
public interface EventCategoryRepository extends JpaRepository<EventCategory,Long> {

}
