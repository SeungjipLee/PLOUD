package com.ssafy.ploud.domain.record;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScoreEntity is a Querydsl query type for ScoreEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScoreEntity extends EntityPathBase<ScoreEntity> {

    private static final long serialVersionUID = 552433423L;

    public static final QScoreEntity scoreEntity = new QScoreEntity("scoreEntity");

    public final NumberPath<Integer> clarity = createNumber("clarity", Integer.class);

    public final NumberPath<Integer> eye = createNumber("eye", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> speed = createNumber("speed", Integer.class);

    public final NumberPath<Integer> volume = createNumber("volume", Integer.class);

    public QScoreEntity(String variable) {
        super(ScoreEntity.class, forVariable(variable));
    }

    public QScoreEntity(Path<? extends ScoreEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScoreEntity(PathMetadata metadata) {
        super(ScoreEntity.class, metadata);
    }

}

